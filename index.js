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



bot.onTextMessage(/./, (message, response) => {
    if(message.text === "hi"){
        response.send(new TextMessage(`Hi Mingalarpar ${response.userProfile.name}!What would you like to buy from our shop?`));
    }
    if(message.text === "hello"){
        response.send(new TextMessage(`Hello Mingalarpar ${response.userProfile.name}!What would you like to buy from our shop?`));      
    }
    if (message.text === "Hello") {
            response.send(new TextMessage(`Hello Mingalarpar ${response.userProfile.name}!What would you like to buy from our shop?`))
        }
    if(message.text === "Hi"){
        response.send(new TextMessage(`Hi Mingalarpar ${response.userProfile.name}!What would you like to buy from our shop?`))
    }
    if(message.text === "buy"){
        response.send(new TextMessage(`you click buy button`));
    }
    if(message.text === "sample"){
        const SAMPLE_RICH_MEDIA = {
            "ButtonsGroupColumns": 6,
            "ButtonsGroupRows": 7,
            "BgColor": "#FFFFFF",
            "Buttons": [
            {
                "ActionBody": "http://www.google.com",
                "ActionType": "open-url",
                "BgMediaType": "picture",
                "Image": "https://static.dezeen.com/uploads/2020/01/sony-vision-s-electric-car-technology_dezeen_2364_hero-1.jpg",
                "BgColor": "#000000",
                "TextOpacity": 60,
                "Rows": 6,
                "Columns": 6
            }, {
                "ActionBody": "http://www.google.com",
                "ActionType": "open-url",
                "BgColor": "#85bb65",
                "Text": "Buy",
                "TextOpacity": 60,
                "Rows": 1,
                "Columns": 6
            },
            {
                "ActionBody": "http://www.google.com",
                "ActionType": "none",
                "BgMediaType": "picture",
                "Image": "https://static.dezeen.com/uploads/2020/01/sony-vision-s-electric-car-technology_dezeen_2364_hero-1.jpg",
                "BgColor": "#000000",
                "TextOpacity": 60,
                "Rows": 6,
                "Columns": 6
            }, {
                "ActionBody": "buy",
                "ActionType": "reply",
                "BgColor": "#85bb65",
                "Text": "Buy",
                "TextOpacity": 60,
                "Rows": 1,
                "Columns": 6
            }

            {
                "ActionBody": "http://www.google.com",
                "ActionType": "none",
                "BgMediaType": "picture",
                "Image": "https://static.dezeen.com/uploads/2020/01/sony-vision-s-electric-car-technology_dezeen_2364_hero-1.jpg",
                "BgColor": "#000000",
                "TextOpacity": 60,
                "Rows": 6,
                "Columns": 6
            }, {
                "ActionBody": "buy",
                "ActionType": "reply",
                "BgColor": "#85bb65",
                "Text": "Buy",
                "TextOpacity": 60,
                "Rows": 1,
                "Columns": 6
            }

            {
                "ActionBody": "http://www.google.com",
                "ActionType": "none",
                "BgMediaType": "picture",
                "Image": "https://static.dezeen.com/uploads/2020/01/sony-vision-s-electric-car-technology_dezeen_2364_hero-1.jpg",
                "BgColor": "#000000",
                "TextOpacity": 60,
                "Rows": 6,
                "Columns": 6
            }, {
                "ActionBody": "buy",
                "ActionType": "reply",
                "BgColor": "#85bb65",
                "Text": "Buy",
                "TextOpacity": 60,
                "Rows": 1,
                "Columns": 6
            }

            ]
        };
        response.send(new RichMediaMessage(SAMPLE_RICH_MEDIA));
    }

});




