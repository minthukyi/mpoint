const ViberBot  = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const TextMessage = require('viber-bot').Message.Text;
const RichMediaMessage = require('viber-bot').Message.RichMedia;
const winston = require('winston');
const toYAML = require('winston-console-formatter');
var request = require('request');

function createLogger() {
    const logger = new winston.createLogger({
        level: "debug" // We recommend using the debug level for development
    });

    logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
    return logger;
}

const logger = createLogger();

// Creating the bot with access token, name and avatar
const bot = new ViberBot(logger, {
    authToken: "4b108d593627d1be-572b518d955f6fd1-d720dc880bcc9bc", // <--- Paste your token here
    name: "Is It Up",  // <--- Your bot name here
    avatar: "http://api.adorable.io/avatar/200/isitup" // It is recommended to be 720x720, and no more than 100kb.
}); 

if (process.env.NOW_URL || process.env.HEROKU_URL) {
    const http = require('http');
    const port = process.env.PORT || 8080;

    http.createServer(bot.middleware()).listen(port, () => bot.setWebhook(process.env.NOW_URL || process.env.HEROKU_URL));
} else {
    logger.debug('Could not find the now.sh/Heroku environment variables. Please make sure you followed readme guide.');
}

function say(response, message) {
    response.send(new TextMessage(message));
}

bot.onSubscribe(response => {
    say(response, `Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me if a web site is down for everyone or just you. Just send me a name of a website and I'll do the rest!`);
});

bot.onConversationStarted((userProfile, isSubscribed, context, onFinish) =>
    onFinish(new TextMessage(`Mingalarpar ${userProfile.name} Welcome from M-Points! What would you like to buy from our shop?`)));

 bot.onTextMessage(/./, (message, response) => {
    if(message.text === "hi"){
        response.send(new TextMessage(`Hi Mingalarpar ${response.userProfile.name} Welcome from M-Points!What would you like to buy from our shop?`));
    }
    if(message.text === "hello"){
        response.send(new TextMessage(`Hello Mingalarpar ${response.userProfile.name} Welcome from M-Points!What would you like to buy from our shop?`));      
    }
    if (message.text === "Hello") {
            response.send(new TextMessage(`Hello Mingalarpar ${response.userProfile.name} Welcome from M-Points!What would you like to buy from our shop?`));
        }
    if(message.text === "Hi"){
        response.send(new TextMessage(`Hi Mingalarpar ${response.userProfile.name} Welcome from M-Points!What would you like to buy from our shop?`));
    }
    
   if(message.text === "Phone bills"){
          const SAMPLE_RICH_MEDIA = {
  {
   "receiver":"nsId6t9MWy3mq09RAeXiug==",
   "type":"rich_media",
   "min_api_version":2,
   "rich_media":{
      "Type":"rich_media",
      "ButtonsGroupColumns":6,
      "ButtonsGroupRows":7,
      "BgColor":"#FFFFFF",
      "Buttons":[
         {
            "Columns":6,
            "Rows":3,
            "ActionType":"open-url",
            "ActionBody":"https://www.google.com",
            "Image":"http://html-test:8080/myweb/guy/assets/imageRMsmall2.png"
         },
         {
            "Columns":6,
            "Rows":2,
            "Text":"<font color=#323232><b>Headphones with Microphone, On-ear Wired earphones</b></font><font color=#777777><br>Sound Intone </font><font color=#6fc133>$17.99</font>",
            "ActionType":"open-url",
            "ActionBody":"https://www.google.com",
            "TextSize":"medium",
            "TextVAlign":"middle",
            "TextHAlign":"left"
         },
         {
            "Columns":6,
            "Rows":1,
            "ActionType":"reply",
            "ActionBody":"https://www.google.com",
            "Text":"<font color=#ffffff>Buy</font>",
            "TextSize":"large",
            "TextVAlign":"middle",
            "TextHAlign":"middle",
            "Image":"https://s14.postimg.org/4mmt4rw1t/Button.png"
         },
         {
            "Columns":6,
            "Rows":1,
            "ActionType":"reply",
            "ActionBody":"https://www.google.com",
            "Text":"<font color=#8367db>MORE DETAILS</font>",
            "TextSize":"small",
            "TextVAlign":"middle",
            "TextHAlign":"middle"
         },
         {
            "Columns":6,
            "Rows":3,
            "ActionType":"open-url",
            "ActionBody":"https://www.google.com",
            "Image":"https://s16.postimg.org/wi8jx20wl/image_RMsmall2.png"
         },
         {
            "Columns":6,
            "Rows":2,
            "Text":"<font color=#323232><b>Hanes Men's Humor Graphic T-Shirt</b></font><font color=#777777><br>Hanes</font><font color=#6fc133>$10.99</font>",
            "ActionType":"open-url",
            "ActionBody":"https://www.google.com",
            "TextSize":"medium",
            "TextVAlign":"middle",
            "TextHAlign":"left"
         },
         {
            "Columns":6,
            "Rows":1,
            "ActionType":"reply",
            "ActionBody":"https://www.google.com",
            "Text":"<font color=#ffffff>Buy</font>",
            "TextSize":"large",
            "TextVAlign":"middle",
            "TextHAlign":"middle",
            "Image":"https://s14.postimg.org/4mmt4rw1t/Button.png"
         },
         {
            "Columns":6,
            "Rows":1,
            "ActionType":"reply",
            "ActionBody":"https://www.google.com",
            "Text":"<font color=#8367db>MORE DETAILS</font>",
            "TextSize":"small",
            "TextVAlign":"middle",
            "TextHAlign":"middle"
         }
      ]
   }
}
 }
 }
});




