# News-Analysis-Telegram-Bot-using-Fluvio-SDF(Dataflows)
News analysis telegram bot fetches and transforms news headlines from newsapi.org and textrazor and send them back to the user as a bot message 

Below is the analyzed message format:

```
Classifying News Articles from the Past 24 hours:

Article: <Article_Title>
Classified Labels:
 - <Lable>: <Score>
 - <Lable>: <Score>

Article: <Article_Title>
Classified Labels:
 - <Lable>: <Score>
 - <Lable>: <Score>
```


```
fluvio cluster start
```

```
npm install
```

```
npx ts-node index.ts
```

```
sdf worker create main
```

```
sdf run --ui --ephemeral -e NEWS_ORG=YOUR_NEWS_ORG_API_KEY -e TEXTRAZOR_KEY=YOUR_TEXTRAZOR_API_KEY -e BOT_TOKEN=YOUR_TELEGRAM_BOT_KEY
```

```
sdf run --ephemeral -e NEWS_ORG=YOUR_NEWS_ORG_API_KEY -e TEXTRAZOR_KEY=YOUR_TEXTRAZOR_API_KEY -e BOT_TOKEN=YOUR_TELEGRAM_BOT_KEY
```

```
sdf clean
```

![image](https://github.com/user-attachments/assets/dae9febf-39f6-4713-b2e2-f4d754ce2209)


![image](https://github.com/user-attachments/assets/eec1fcb6-9a43-48c4-8263-35ecdf7caf87)

![image](https://github.com/user-attachments/assets/9c1ba7e7-9ead-43dc-aa7b-b2c2a09f4cd5)

![image](https://github.com/user-attachments/assets/70682023-ccea-47f6-a24f-dedfc12a700c)


![image](https://github.com/user-attachments/assets/a7e8a121-1fa6-4bf5-bfb9-752e90ec7307)

