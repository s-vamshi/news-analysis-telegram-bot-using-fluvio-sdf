# **News-Analysis-Telegram-Bot-using-Fluvio-SDF(Dataflows)**
![image](https://github.com/user-attachments/assets/e50c3042-3758-4ecf-b4bb-4edb14301187)

## Overview
News analysis telegram bot fetches and transforms news headlines from newsapi.org  and textrazor and send them back to the user as a bot message 


## Tech Stack
1. **[Fluvio CLI](https://www.fluvio.io/docs/fluvio/apis/nodejs/installation)**
2. **[Stateful Dataflows(sdf)](https://www.fluvio.io/sdf/compositions/quickstart)**
3. **Express.js**
4. **ngrok**

## APIs Used
1. **[NewsAPI](https://newsapi.org/)(Free Tier)** - *To fetch News Articles*
2. **[TextRazor](https://www.textrazor.com/)(Free Tier)** - *To classify News Articles*
3. **[Telegram Bot API](https://telegram.me/BotFather)** - *To communicate with bot*
4. **[ngrok](https://ngrok.com/)** - *To create secure tunneling* 

## Prerequisites
1. Basic understanding of Event-Driven Architecture and APIs.
2. Windows(WSL-Ubuntu) or Linux OS
3. Rust 1.80 or beyond installed
4. Node.js 16.11.0 or beyond installed

## Getting Started
1. To install Fluvio, open terminal and run 
```
curl -fsS https://hub.infinyon.cloud/install/install.sh | bash
```
2. Add fluvio to your path and source the new .bashrc file
```
echo 'export PATH="${HOME}/.fvm/bin:${HOME}/.fluvio/bin:${PATH}"' >> ~/.bashrc
```
```
echo 'source "${HOME}/.fvm/env"' >> ~/.bashrc
```
```
source ~/.bashrc
```
3. Start fluvio cluster by running command below
```
fluvio cluster start
```
4. Checkout to server folder
```
cd server
```
5. Install the required Node.js dependencies
```
npm install
```
6. Set your API keys of Telegram Bot ([follow Instructions](https://core.telegram.org/bots/tutorial#obtain-your-bot-token)) and [ngrok](https://dashboard.ngrok.com/get-started/your-authtoken) in .env file. 
7. 
```
npx ts-node index.ts
```

![photo_2024-08-26_20-20-35](https://github.com/user-attachments/assets/472da26d-bf1e-4c97-9cd6-421e4a5a8c86)
![photo_2024-08-26_20-20-35 (2)](https://github.com/user-attachments/assets/5fc29bf3-563b-4604-8046-5cc45b921a56)
![photo_2024-08-26_20-20-35 (3)](https://github.com/user-attachments/assets/f1e3e496-048a-4fa2-9fa7-4acc5aeb3879)
![photo_2024-08-26_20-20-35 (4)](https://github.com/user-attachments/assets/a5865964-715a-4eac-b4b7-6d21652ad73a)


![image](https://github.com/user-attachments/assets/aba26d1a-30a7-4107-b3ad-6006615d6c8a)




Create the SDF worker
```
sdf worker create main
```
Run the SDF with the required API keys
```
sdf run --ui --ephemeral -e NEWS_ORG=YOUR_NEWS_ORG_API_KEY -e TEXTRAZOR_KEY=YOUR_TEXTRAZOR_API_KEY -e BOT_TOKEN=YOUR_TELEGRAM_BOT_KEY
```
Alternatively, you can run the SDF without the UI
```
sdf run --ephemeral -e NEWS_ORG=YOUR_NEWS_ORG_API_KEY -e TEXTRAZOR_KEY=YOUR_TEXTRAZOR_API_KEY -e BOT_TOKEN=YOUR_TELEGRAM_BOT_KEY
```

![image](https://github.com/user-attachments/assets/dae9febf-39f6-4713-b2e2-f4d754ce2209)


![image](https://github.com/user-attachments/assets/eec1fcb6-9a43-48c4-8263-35ecdf7caf87)

![image](https://github.com/user-attachments/assets/9c1ba7e7-9ead-43dc-aa7b-b2c2a09f4cd5)

![image](https://github.com/user-attachments/assets/70682023-ccea-47f6-a24f-dedfc12a700c)


![image](https://github.com/user-attachments/assets/a7e8a121-1fa6-4bf5-bfb9-752e90ec7307)


### Analyzed Message Format
The bot sends analyzed messages in the following format:

```
Classifying News Articles from the Past 24 hours:

Article: <Article_Title>
Classified Labels:
 - <Label>: <Score>
 - <Label>: <Score>

Article: <Article_Title>
Classified Labels:
 - <Label>: <Score>
 - <Label>: <Score>
```













