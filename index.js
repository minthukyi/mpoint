const ViberBot  = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const TextMessage = require('viber-bot').Message.Text;
const KeyboardMessage = require('viber-bot').Message.Keyboard;
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
    name: "M-Points",  // <--- Your bot name here
    avatar: "http://api.adorable.io/avatar/200/isitup" // It is recommended to be 720x720, and no more than 100kb.
}); 

if (process.env.NOW_URL || process.env.HEROKU_URL) {
    const http = require('http');
    const port = process.env.PORT || 8080;

    http.createServer(bot.middleware()).listen(port, () => bot.setWebhook(process.env.NOW_URL || process.env.HEROKU_URL));
} else {
    logger.debug('Could not find the now.sh/Heroku environment variables. Please make sure you followed readme guide.');
}

bot.on(BotEvents.CONVERSATION_STARTED, (userProfile, isSubscribed, context, onFinish) => {
  bot.sendMessage(userProfile.userProfile, [new TextMessage(`Mingalarpar ${userProfile.userProfile.name} Welcome from M-Points! You can order phone bills cards from our shop!`), new TextMessage(`Today rating persentage are as following: If you order below 50000ks you can get 4.2%, between 50000ks and 100000ks you can get 4.4% and above 100000ks you can get 4.6%. Percentage are not stable, they have daily changes!`,
               {
                "Type": "keyboard",
                "InputFieldState": "hidden",
                "DefaultHeight": false,
                "BgColor": '#006600',
                "Buttons": [
                    {
                        "Columns": 6,
                        "Rows": 1,
                        "BgColor": '#009900',
                        "ActionType": "reply",
                        "ActionBody": "Hi",
                        "Text": "<font color='#ffffff'>Go To Shop</font>"
             }
            ]
        }, "","","", 7)]);
});
    
 bot.onTextMessage(/./, (message, response) => {
    
   if(message.text === "Hi"){
        const SAMPLE_RICH_MEDIA = {
            "ButtonsGroupColumns": 6,
            "ButtonsGroupRows": 7,
            "BgColor": "#FFFFFF",
            "Buttons": [
            {
                "ActionBody": "MPT",
                "ActionType": "reply",
                "BgMediaType": "picture",
                "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTiaiT2jEjKsHBKugBZDmidM-_D4R5lZ5ZOfYsWyGhsng9_USRo",
                "BgColor": "#000000",
                "TextOpacity": 60,
                "Rows": 6,
                "Columns": 6
            }, 
                {
                "ActionBody": "MPT",
                "ActionType": "reply",
                "BgColor": "#85bb65",
                "Text": "MPT",
                "TextOpacity": 60,
                "Rows": 1,
                "Columns": 6
            },
            {
                "ActionBody": "Ooredoo",
                "ActionType": "reply",
                "BgMediaType": "picture",
                "Image": "https://www.thefastmode.com/media/k2/items/src/0f141567eda6067eb710764f558d3d2b.jpg",
                "BgColor": "#000000",
                "TextOpacity": 60,
                "Rows": 6,
                "Columns": 6
            }, 
            {
                "ActionBody": "Ooredoo",
                "ActionType": "reply",
                "BgColor": "#85bb65",
                "Text": "Ooredoo",
                "TextOpacity": 60,
                "Rows": 1,
                "Columns": 6
            },

            {
                "ActionBody": "Telenor",
                "ActionType": "reply",
                "BgMediaType": "picture",
                "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSOqOLFi-WL_D5FJHbx04Ian-fBqCm8R772dszQ6se6vaRXLd_K",
                "BgColor": "#000000",
                "TextOpacity": 60,
                "Rows": 6,
                "Columns": 6
            }, {
                "ActionBody": "Telenor",
                "ActionType": "reply",
                "BgColor": "#85bb65",
                "Text": "Telenor",
                "TextOpacity": 60,
                "Rows": 1,
                "Columns": 6
            },

            {
                "ActionBody": "Mytel",
                "ActionType": "reply",
                "BgMediaType": "picture",
                "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTX5spsmlkLEqviS6A6JaKHQoj0g_TeCbaP-Avk_oNA3H8qlihA",
                "BgColor": "#000000",
                "TextOpacity": 60,
                "Rows": 6,
                "Columns": 6
            },
            {
                "ActionBody": "Mytel",
                "ActionType": "reply",
                "BgColor": "#85bb65",
                "Text": "Mytel",
                "TextOpacity": 60,
                "Rows": 1,
                "Columns": 6
            },

            ]
        };
        response.send(new TextMessage(`These are different types of phone bills what would you like to order?`));
        response.send(new RichMediaMessage(SAMPLE_RICH_MEDIA));
   }
     if(message.text === "Mytel"){     
     const SAMPLE_RICH_MEDIA = {
     "ButtonsGroupColumns": 4,
     "ButtonsGroupRows": 1,
     "BgColor": "#FFFFFF",
     "Buttons": [

{
     "ActionBody": "bills",
     "ActionType": "reply",
     "BgColor": "#85bb65",
     "Text": "Mytel-1000Ks",
     "Rows": 1,
     "Columns": 4
},
{
     "ActionBody": "bills",
     "ActionType": "reply",
     "BgColor": "#85bb65",
     "Text": "Mytel-3000Ks",
     "Rows": 1,
     "Columns": 4
},
{
     "ActionBody": "bills",
     "ActionType": "reply",
     "BgColor": "#85bb65",
     "Text": "Mytel-5000Ks",
     "Rows": 1,
     "Columns": 4
},
{
     "ActionBody": "bills",
     "ActionType": "reply",
     "BgColor": "#85bb65",
     "Text": "Mytel-10000Ks",
     "Rows": 1,
     "Columns": 4
},
]
};

    response.send(new TextMessage(`These are different amount of Mytel phone bills what would you like to order?`));
    response.send(new RichMediaMessage(SAMPLE_RICH_MEDIA)); 
 }
     if(message.text === "MPT"){
     const SAMPLE_RICH_MEDIA = {
     "ButtonsGroupColumns": 4,
     "ButtonsGroupRows": 1,
     "BgColor": "#FFFFFF",
     "Buttons": [

{
     "ActionBody": "bills",
     "ActionType": "reply",
     "BgColor": "#85bb65",
     "Text": "MPT-1000Ks",
     "Rows": 1,
     "Columns": 4
},
{
     "ActionBody": "bills",
     "ActionType": "reply",
     "BgColor": "#85bb65",
     "Text": "MPT-3000Ks",
     "Rows": 1,
     "Columns": 4
},
{
     "ActionBody": "bills",
     "ActionType": "reply",
     "BgColor": "#85bb65",
     "Text": "MPT-5000Ks",
     "Rows": 1,
     "Columns": 4
},
{
     "ActionBody": "bills",
     "ActionType": "reply",
     "BgColor": "#85bb65",
     "Text": "MPT-10000Ks",
     "Rows": 1,
     "Columns": 4
},
]
};

    response.send(new TextMessage(`These are different amount of Mytel phone bills what would you like to order?`));
    response.send(new RichMediaMessage(SAMPLE_RICH_MEDIA)); 
 }
     if(message.text === "Telenor"){
     const SAMPLE_RICH_MEDIA = {
     "ButtonsGroupColumns": 4,
     "ButtonsGroupRows": 1,
     "BgColor": "#FFFFFF",
     "Buttons": [

{
     "ActionBody": "bills",
     "ActionType": "reply",
     "BgColor": "#85bb65",
     "Text": "Telenor-1000Ks",
     "Rows": 1,
     "Columns": 4
},
{
     "ActionBody": "bills",
     "ActionType": "reply",
     "BgColor": "#85bb65",
     "Text": "Telenor-3000Ks",
     "Rows": 1,
     "Columns": 4
},
{
     "ActionBody": "bills",
     "ActionType": "reply",
     "BgColor": "#85bb65",
     "Text": "Telenor-5000Ks",
     "Rows": 1,
     "Columns": 4
},
{
     "ActionBody": "bills",
     "ActionType": "reply",
     "BgColor": "#85bb65",
     "Text": "Telenor-10000Ks",
     "Rows": 1,
     "Columns": 4
},
]
};

    response.send(new TextMessage(`These are different amount of Mytel phone bills what would you like to order?`));
    response.send(new RichMediaMessage(SAMPLE_RICH_MEDIA)); 
}
 if(message.text === "Ooredoo"){
     const SAMPLE_RICH_MEDIA = {
     "ButtonsGroupColumns": 4,
     "ButtonsGroupRows": 1,
     "BgColor": "#FFFFFF",
     "Buttons": [

{
     "ActionBody": "bills",
     "ActionType": "reply",
     "BgColor": "#85bb65",
     "Text": "Ooredoo-1000Ks",
     "Rows": 1,
     "Columns": 4
},
{
     "ActionBody": "bills",
     "ActionType": "reply",
     "BgColor": "#85bb65",
     "Text": "Ooredoo-3000Ks",
     "Rows": 1,
     "Columns": 4
},
{
     "ActionBody": "bills",
     "ActionType": "reply",
     "BgColor": "#85bb65",
     "Text": "Ooredoo-5000Ks",
     "Rows": 1,
     "Columns": 4
},
{
     "ActionBody": "bills",
     "ActionType": "reply",
     "BgColor": "#85bb65",
     "Text": "Ooredoo-10000Ks",
     "Rows": 1,
     "Columns": 4
},
]
};

    response.send(new TextMessage(`These are different amount of Mytel phone bills what would you like to order?`));
    response.send(new RichMediaMessage(SAMPLE_RICH_MEDIA)); 
} 
});

if(message.text === "bills"){
 response.send(new TextMessage('Please type the amount you want!'));
}
    /* {
     "ActionBody": "Ooredoo/1000",
     "ActionType": "reply",
     "BgColor": "#85bb65",
     "Text": "Ooredoo-1000Ks",
     "Rows": 1,
     "Columns": 4
},
{
     "ActionBody": "Ooredoo/3000",
     "ActionType": "reply",
     "BgColor": "#85bb65",
     "Text": "Ooredoo-3000Ks",
     "Rows": 1,
     "Columns": 4
},
{
     "ActionBody": "Ooredoo/5000",
     "ActionType": "reply",
     "BgColor": "#85bb65",
     "Text": "Ooredoo-5000Ks",
     "Rows": 1,
     "Columns": 4
},
{
     "ActionBody": "Ooredoo/10000",
     "ActionType": "reply",
     "BgColor": "#85bb65",
     "Text": "Ooredoo-10000Ks",
     "Rows": 1,
     "Columns": 4
},
        if(userInput.inculdes('Ooredoo')){
        userInput=userInput.split('/')
        var amount = userInput[0]
    }*/

    
