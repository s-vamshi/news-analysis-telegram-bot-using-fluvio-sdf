# **News-Analysis-Telegram-Bot-using-Fluvio-SDF(Dataflows)**
![image](https://github.com/user-attachments/assets/e50c3042-3758-4ecf-b4bb-4edb14301187)

## Overview
The News Analysis Telegram Bot fetches and transforms news headlines from newsapi.org and analyses them using TextRazor and sends them back to the user as a bot message using Fluvio Node.js Client and Stateful Dataflow(sdf) pipeline.

### Graphical Represetation of the Project in Browser
![image](https://github.com/user-attachments/assets/a7e8a121-1fa6-4bf5-bfb9-752e90ec7307)

## Prerequisites
1. Basic understanding of Event-Driven Architecture and APIs.
2. Windows(WSL-Ubuntu) or Linux OS
3. Rust 1.80 or beyond installed
4. Node.js 16.11.0 or beyond installed
5. Telegram Web-hooks

## Tech Stack
1. **[Fluvio CLI](https://www.fluvio.io/docs/fluvio/apis/nodejs/installation)**
2. **[Stateful Dataflows(sdf)](https://www.fluvio.io/sdf/concepts/composition/quickstart/)**
3. **Express.js**
4. **ngrok**

## APIs Used
1. **[NewsAPI](https://newsapi.org/)(Free Tier)** - *To fetch News Articles*
2. **[TextRazor](https://www.textrazor.com/)(Free Tier)** - *To classify News Articles*
3. **[Telegram Bot API](https://telegram.me/BotFather)** - *To communicate with bot*
4. **[ngrok](https://ngrok.com/)** - *To create secure tunneling* 



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
4. Installing *wasm32-wasip1*
```
rustup target add wasm32-wasip1
```
5. Currently sdf is in beta mode so lets install it using fvm
```
fvm install sdf-beta1.1
```
6. Validating if prerequisites of sdf got installed correctly
```
sdf setup
```
7. Create the SDF worker
```
sdf worker create main
```
8. Run the SDF with the required API keys which will compile and run the dataflow.
```
sdf run --ui --ephemeral -e NEWS_ORG=YOUR_NEWS_ORG_API_KEY -e TEXTRAZOR_KEY=YOUR_TEXTRAZOR_API_KEY -e BOT_TOKEN=YOUR_TELEGRAM_BOT_KEY
```
9. Alternatively, you can run the SDF without the ui
```
sdf run --ephemeral -e NEWS_ORG=YOUR_NEWS_ORG_API_KEY -e TEXTRAZOR_KEY=YOUR_TEXTRAZOR_API_KEY -e BOT_TOKEN=YOUR_TELEGRAM_BOT_KEY
```

10. Now checkout to server folder
```
cd server
```
11. Install the required Node.js dependencies
```
npm install
```
12. Set your API keys of Telegram Bot ([follow Instructions](https://core.telegram.org/bots/tutorial#obtain-your-bot-token)) and [ngrok](https://dashboard.ngrok.com/get-started/your-authtoken) in .env file. 
13. Start the server to receive events from Telegram
```
npx ts-node index.ts
```
![image](https://github.com/user-attachments/assets/4aa7e469-8aa3-4c75-9873-c2a0c5e23e42)

14. As your server is up and running you can now use the Telegram bot to get updates using _/start_ and _/updates_ commands.

<details>
<summary><h3><b>Screenshots</b></h3></summary>

<img src="https://github.com/user-attachments/assets/5fc29bf3-563b-4604-8046-5cc45b921a56" width=25% height=25%>
<img src="https://github.com/user-attachments/assets/f1e3e496-048a-4fa2-9fa7-4acc5aeb3879" width=25% height=25%>
<br/>
<img src="https://github.com/user-attachments/assets/a5865964-715a-4eac-b4b7-6d21652ad73a">
</details>

<details>
<summary><h3><b>Sample Responses</b></h3></summary>
 
**news topic** - Sample consumed event
![image](https://github.com/user-attachments/assets/796ff497-d712-4ba6-b221-d432eb644e79)
**Sample consumed Response Format**
```
{
  "chatid": "5048923407",
  "results": [
    {
      "author": "NDTV",
      "published_at": "2024-08-25T11:25:15Z",
      "source": {
        "id": "google-news",
        "name": "Google News"
      },
      "title": "On Haryana Poll Postponement Request, BJP Leader's Clarification - NDTV",
      "url": "some url"
    }
  ]
}
```
**summarized-articles topic** - Sample consumed event
![image](https://github.com/user-attachments/assets/eec1fcb6-9a43-48c4-8263-35ecdf7caf87)
**Sample consumed Response Format**
```
{
  "counts": [
    {
      "author": "WION",
      "count": 1
    },
    {
      "author": "NDTV Movies",
      "count": 1
    },
    {
      "author": "NDTV Sports",
      "count": 1
    },
    {
      "author": "The Economic Times",
      "count": 1
    },
    {
      "author": "Onmanorama",
      "count": 1
    },
    {
      "author": "TOI Etimes",
      "count": 1
    },
    {
      "author": "Mint",
      "count": 1
    },
    {
      "author": "Al Jazeera English",
      "count": 1
    },
    {
      "author": "Moneycontrol",
      "count": 1
    },
    {
      "author": "NDTV",
      "count": 3
    },
    {
      "author": "Hindustan Times",
      "count": 5
    },
    {
      "author": "BusinessLine",
      "count": 1
    },
    {
      "author": "The Indian Express",
      "count": 1
    },
    {
      "author": "The Hindu",
      "count": 1
    }
  ]
}
```
**classified-articles topic** - Sample consumed event
![image](https://github.com/user-attachments/assets/9c1ba7e7-9ead-43dc-aa7b-b2c2a09f4cd5)
**Sample consumed Response Format**
```
{
  "chatid": "1234567890",
  "results": [
    {
      "categories": [
        {
          "label": "Politics",
          "score": 0.7437
        },
        {
          "label": "Politics>Elections",
          "score": 0.5229
        }
      ],
      "text": "On Haryana Poll Postponement Request, BJP Leader's Clarification - NDTV"
    },
    {
      "categories": [
        {
          "label": "Science",
          "score": 0.9956
        },
        {
          "label": "Science>Space and Astronomy",
          "score": 0.7291
        }
      ],
      "text": "NASA Hubble captures 'candy-floss' in space. Meet our cosmic neighbours - Hindustan Times"
    }
  ]
}
```

**telegram-logs topic** - Sample consumed event
![image](https://github.com/user-attachments/assets/70682023-ccea-47f6-a24f-dedfc12a700c)

</details>


### Analyzed Message Format
The bot sends analyzed messages in the following format:

```
Classifying News Articles from the Past 24 hours:

Article: <Article_Title>
Classified Labels:
 - <Label>: <Probability_Score>
 - <Label>: <Score>

Article: <Article_Title>
Classified Labels:
 - <Label>: <Score>
 - <Label>: <Score>
```













