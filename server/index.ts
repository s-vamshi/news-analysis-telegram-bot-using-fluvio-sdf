import Fluvio from "@fluvio/client";
import express from 'express';
import axios from 'axios';
import ngrok from '@ngrok/ngrok';
import dotenv from 'dotenv';

dotenv.config();

const TOPIC_NAME = 'userupdates';
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_BOT_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;
const NGROK_TOKEN = process.env.NGROK_TOKEN;

const app = express();
const PORT: any = process.env.PORT || 3000;

const fluvio = new Fluvio();

app.use(express.json());

const setWebhook = async (ngrokUrl: string | null) => {
    const webhookUrl = `${ngrokUrl}/webhook`;
    await axios.post(`${TELEGRAM_BOT_URL}/setWebhook`, {
        url: webhookUrl,
    });
    console.log(`Webhook set to ${webhookUrl}`);
};

const produce = async (message: number) => {
    await fluvio.connect();
    try {
        const admin = await fluvio.admin();
        await admin.createTopic(TOPIC_NAME);
    } catch (ex: any) {
        console.log(ex[0]);
    }

    const producer = await fluvio.topicProducer(TOPIC_NAME);
    await producer.send("chatId", message.toString());
};

app.post('/webhook', async (req, res) => {
    const telegramRequest = req.body;

    if (telegramRequest && telegramRequest.message && telegramRequest.message.from) {
        const chatId = telegramRequest.message.from.id;
        const text = telegramRequest.message.text;

        if (text === '/start') {
            const replyText = 'Hello! This bot uses Fluvio to Analyze News Articles... \nUse */updates* to Analyze';
            await axios.post(`${TELEGRAM_BOT_URL}/sendMessage`, {
                chat_id: chatId,
                text: replyText,
            });
            res.sendStatus(200);
        } else if (text === '/updates') {
            const replyText = 'Analyzing News Articles of past 24Hrs... \nThis might take 5secs.....';
            try {
                await produce(chatId);
                await axios.post(`${TELEGRAM_BOT_URL}/sendMessage`, {
                    chat_id: chatId,
                    text: replyText,
                });
                res.sendStatus(200);
            } catch (error) {
                console.error('Error producing message:', error);
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(400);
    }
});

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    const listener = await ngrok.connect({ addr: PORT, authtoken: NGROK_TOKEN });
    const url = listener.url();
    console.log(`ngrok tunnel opened at: ${url}`);

    await setWebhook(url);
});
