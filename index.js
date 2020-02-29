const ViberBot  = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const TextMessage = require('viber-bot').Message.Text;
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


/*
bot.onTextMessage(/./, (message, response) => {
    checkUrlAvailability(response, message.text);
});*/

bot.onTextMessage(/^mingalarpar$/i, (message, response) =>
    response.send(new TextMessage(`Min Ga Lar Par ${response.userProfile.name}.`)));

bot.onTextMessage(/^how are you$/i, (message, response) =>
    response.send(new TextMessage(`Fine`)));

