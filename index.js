const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const TextMessage = require('viber-bot').Message.Text;
const KeyboardMessage = require('viber-bot').Message.Keyboard;
const RichMediaMessage = require('viber-bot').Message.RichMedia;
const winston = require('winston');
const toYAML = require('winston-console-formatter');
var request = require('request');
var serviceAccount = process.env.serviceAccount;
serviceAccount = JSON.parse(serviceAccount);
var admin = require('firebase-admin');

var serviceAccount = process.env.serviceAccount;
serviceAccount = JSON.parse(serviceAccount);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mpoints-bill.firebaseio.com"
});

var db = admin.firestore();

// Creating the bot with access token, name and avatar
const bot = new ViberBot({
    authToken: "4b108d593627d1be-572b518d955f6fd1-d720dc880bcc9bc", // <--- Paste your token here
    name: "M-Points", // <--- Your bot name here
    avatar: "http://api.adorable.io/avatar/200/isitup" // It is recommended to be 720x720, and no more than 100kb.
});

if (process.env.NOW_URL || process.env.HEROKU_URL) {
    const http = require('http');
    const port = process.env.PORT || 8080;

    http.createServer(bot.middleware()).listen(port, () => bot.setWebhook(process.env.NOW_URL || process.env.HEROKU_URL));
}

bot.on(BotEvents.CONVERSATION_STARTED, (userProfile, isSubscribed, context, onFinish) => {
    bot.sendMessage(userProfile.userProfile, [new TextMessage(`Mingalarpar ${userProfile.userProfile.name} Welcome from M-Points! You can order phone bills cards from our shop!`), new TextMessage(`Today rating persentage are as following: If you order below 50000ks you can get 4.2%, between 50000ks and 100000ks you can get 4.4% and above 100000ks you can get 4.6%. Percentage are not stable, they have daily changes!`, {
        "Type": "keyboard",
        "InputFieldState": "hidden",
        "DefaultHeight": false,
        "BgColor": '#006600',
        "Buttons": [{
            "Columns": 6,
            "Rows": 1,
            "BgColor": '#009900',
            "ActionType": "reply",
            "ActionBody": "Hi",
            "Text": "<font color='#ffffff'>Go to shop</font>"
        }]
    }, "", "", "", 7)]);     
});

bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    console.log(message);
    if (message.contactPhoneNumber){
        var trackingData = message.trackingData[0];
        bot.sendMessage(response.userProfile, new KeyboardMessage({
                    
                            "Type": "keyboard",
                            "InputFieldState": "hidden",
                            "Revision": 1,
                            "Buttons": [{
                                "Columns": 6,
                                "Rows": 1,
                                "BgColor": "#99FFFF",
                                "ActionType": "location-picker",
                                "ActionBody": `buy`,
                                "Text": "<font color='#000000'>Share Location</font>"
                            }]},"","","",7), [[trackingData,message.contactPhoneNumber]]);
    }
    if (message.latitude){
        var trackingData = message.trackingData[0];
        var phone = trackingData[1];
        var id = trackingData[0];
        db.collection('orderList').doc('id').set({
            phone: phone,
            location: {lat: message.latitude, long: message.longitude}
        }, {merge: true}).then(success=>{
            bot.sendMessage(response.userProfile, new TextMessage('Purchase success! This is your order id: '+id));
            bot.sendMessage(response.userProfile, [new TextMessage('Enjoyed using our service? Register with us for better benefits!'),
                            new KeyboardMessage ({
                            "Type": "keyboard",
                            "InputFieldState": "hidden",
                            "Revision": 1,
                            "Buttons": [{
                                "Columns": 6,
                                "Rows": 1,
                                "BgColor": "#99FFFF",
                                "ActionType": "reply",
                                "ActionBody": `HH`,
                                "Text": "<font color='#000000'>Register</font>"
                            }]
                        },"","","",7)]);
            
        })
    }
        if (message.text === "HH"){
        bot.sendmessage(response.userProfile, new TextMessage('Registered'));
        }
    if (message.text) {
        var userInput = message.text;
         bot.sendMessage(response.userProfile, new KeyboardMessage({
                    
                            "Type": "keyboard",
                            "InputFieldState": "hidden",
                            "Revision": 1,
                            "Buttons": [{
                                "Columns": 6,
                                "Rows": 1,
                                "BgColor": "#99FFFF",
                                "ActionType": "reply",
                                "ActionBody": `Hi`,
                                "Text": "<font color='#000000'>View My Points</font>"
                            }]},"","","",7));
      
        if (message.text === "Hi") {
            const SAMPLE_RICH_MEDIA = {
                "ButtonsGroupColumns": 6,
                "ButtonsGroupRows": 7,
                "BgColor": "#FFFFFF",
                "Buttons": [{
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
            bot.sendMessage(response.userProfile, [new TextMessage('Which type of phone top-up do you want to purchase?'), new RichMediaMessage(SAMPLE_RICH_MEDIA)])
        }
        if (message.text === "Mytel") {
            const SAMPLE_RICH_MEDIA = {
                "ButtonsGroupColumns": 4,
                "ButtonsGroupRows": 1,
                "BgColor": "#FFFFFF",
                "Buttons": [

                    {
                        "ActionBody": "Mytel/1000",
                        "ActionType": "reply",
                        "BgColor": "#85bb65",
                        "Text": "Mytel-1000Ks",
                        "Rows": 1,
                        "Columns": 4
                    },
                    {
                        "ActionBody": "Mytel/3000",
                        "ActionType": "reply",
                        "BgColor": "#85bb65",
                        "Text": "Mytel-3000Ks",
                        "Rows": 1,
                        "Columns": 4
                    },
                    {
                        "ActionBody": "Mytel/5000",
                        "ActionType": "reply",
                        "BgColor": "#85bb65",
                        "Text": "Mytel-5000Ks",
                        "Rows": 1,
                        "Columns": 4
                    },
                    {
                        "ActionBody": "Mytel/10000",
                        "ActionType": "reply",
                        "BgColor": "#85bb65",
                        "Text": "Mytel-10000Ks",
                        "Rows": 1,
                        "Columns": 4
                    },
                ]
            };

            bot.sendMessage(response.userProfile, [new TextMessage('Please choose denomination?'), new RichMediaMessage(SAMPLE_RICH_MEDIA)])
        }
        if (message.text === "MPT") {
            const SAMPLE_RICH_MEDIA = {
                "ButtonsGroupColumns": 4,
                "ButtonsGroupRows": 1,
                "BgColor": "#FFFFFF",
                "Buttons": [

                    {
                        "ActionBody": "MPT/1000",
                        "ActionType": "reply",
                        "BgColor": "#85bb65",
                        "Text": "MPT-1000Ks",
                        "Rows": 1,
                        "Columns": 4
                    },
                    {
                        "ActionBody": "MPT/3000",
                        "ActionType": "reply",
                        "BgColor": "#85bb65",
                        "Text": "MPT-3000Ks",
                        "Rows": 1,
                        "Columns": 4
                    },
                    {
                        "ActionBody": "MPT/5000",
                        "ActionType": "reply",
                        "BgColor": "#85bb65",
                        "Text": "MPT-5000Ks",
                        "Rows": 1,
                        "Columns": 4
                    },
                    {
                        "ActionBody": "MPT/10000",
                        "ActionType": "reply",
                        "BgColor": "#85bb65",
                        "Text": "MPT-10000Ks",
                        "Rows": 1,
                        "Columns": 4
                    },
                ]
            };

            bot.sendMessage(response.userProfile, [new TextMessage('Please choose denomination?'), new RichMediaMessage(SAMPLE_RICH_MEDIA)])
        }
        if (message.text === "Telenor") {
            const SAMPLE_RICH_MEDIA = {
                "ButtonsGroupColumns": 4,
                "ButtonsGroupRows": 1,
                "BgColor": "#FFFFFF",
                "Buttons": [

                    {
                        "ActionBody": "Telenor/1000",
                        "ActionType": "reply",
                        "BgColor": "#85bb65",
                        "Text": "Telenor-1000Ks",
                        "Rows": 1,
                        "Columns": 4
                    },
                    {
                        "ActionBody": "Telenor/3000",
                        "ActionType": "reply",
                        "BgColor": "#85bb65",
                        "Text": "Telenor-3000Ks",
                        "Rows": 1,
                        "Columns": 4
                    },
                    {
                        "ActionBody": "Telenor/5000",
                        "ActionType": "reply",
                        "BgColor": "#85bb65",
                        "Text": "Telenor-5000Ks",
                        "Rows": 1,
                        "Columns": 4
                    },
                    {
                        "ActionBody": "Telenor/10000",
                        "ActionType": "reply",
                        "BgColor": "#85bb65",
                        "Text": "Telenor-10000Ks",
                        "Rows": 1,
                        "Columns": 4
                    },
                ]
            };

            bot.sendMessage(response.userProfile, [new TextMessage('Please choose denomination?'), new RichMediaMessage(SAMPLE_RICH_MEDIA)])
        }
        if (message.text === "Ooredoo") {
            const SAMPLE_RICH_MEDIA = {
                "ButtonsGroupColumns": 4,
                "ButtonsGroupRows": 1,
                "BgColor": "#FFFFFF",
                "Buttons": [

                    {
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
                ]
            };

            bot.sendMessage(response.userProfile, [new TextMessage('Please choose denomination?'), new RichMediaMessage(SAMPLE_RICH_MEDIA)])
        }
        if (userInput.includes('Calculate/')) {
            console.log('in calculate');
          
            if (userInput.includes("/Ooredoo") || userInput.includes('/Telenor') || userInput.includes('/MPT') || userInput.includes('/Mytel')) {
                var userInput = message.text.split('/')
                var operator = userInput[3]
                var quantity = userInput[2]
                var amount = userInput[1]
                if (parseInt(amount) < 50000) {
                    var percentage = 4.2
                }
                if (parseInt(amount) >= 50000 && parseInt(amount) <= 100000) {
                    var percentage = 4.4
                }
                if (parseInt(amount) > 100000) {
                    var percentage = 4.6
                }
                var amount = parseInt(amount);
                var discountValue = (amount * percentage);
                discountValue = discountValue / 100;
                discountValue = Math.ceil(discountValue);
                var userAmount = `${amount - discountValue}`;
                var remainder = `${userAmount[userAmount.length - 2]}${userAmount[userAmount.length - 1]}`;
                var latestAmount = parseInt(userAmount) - parseInt(remainder);
                db.collection('pointsList').where('viberId', '==', `${response.userProfile.id}`).get().then(pointList=>{
                    if(pointList.size > 0){
                        pointList.forEach(pointList=> {
                            var latestpoints = parseInt(pointList.data().points)+parseInt(remainder);
                        db.collection('pointsList').doc(`pointList.id`).set({
                    points: `${latestpoints}`
                }, {merge:true}).then(success=>{
                    db.collection('orderList').add({
                        viberId: response.userProfile.id,
                        name: response.userProfile.name,
                        price: latestAmount,
                        operator: operator,
                        quantity: quantity
                    }).then(ok => {
                        bot.sendMessage(response.userProfile, [new TextMessage(`Your price is ${userAmount} kyats, you save ${remainder} kyats! This ${remainder} kyats will save as points! ( 1 point = 1 kyat) Now your cost is ${latestAmount} kyats. Do you wish to confirm purchase?`),
                
                                new KeyboardMessage({
                    
                            "Type": "keyboard",
                            "InputFieldState": "hidden",
                            "Revision": 1,
                            "Buttons": [{
                                "Columns": 6,
                                "Rows": 1,
                                "BgColor": "#99FFFF",
                                "ActionType": "share-phone",
                                "ActionBody": `buy`,
                                "Text": "<font color='#000000'>Yes</font>"
                            }, {
                                "Columns": 6,
                                "Rows": 1,
                                "BgColor": "#99FFFF",
                                "ActionType": "reply",
                                "ActionBody": `Hi`,
                                "Text": "<font color='#000000'>No</font>"
                            }]
                        }, "", "", "", 7)], [ok.id]);
                    })
                })
                        })
                        
                    }else{
                        db.collection('pointsList').add({
                    viberId: response.userProfile.id,
                    name: response.userProfile.name,
                    points: remainder
                }).then(success=>{
                    db.collection('orderList').add({
                        viberId: response.userProfile.id,
                        name: response.userProfile.name,
                        price: latestAmount,
                        operator: operator,
                        quantity: quantity
                    }).then(ok => {
                        bot.sendMessage(response.userProfile, [new TextMessage(`Your price is ${userAmount} kyats, you save ${remainder} kyats! This ${remainder} kyats will save as points! Now your cost is ${latestAmount} kyats. Do you wish to confirm purchase?`),
                
                                new KeyboardMessage({
                    
                            "Type": "keyboard",
                            "InputFieldState": "hidden",
                            "Revision": 1,
                            "Buttons": [{
                                "Columns": 6,
                                "Rows": 1,
                                "BgColor": "#99FFFF",
                                "ActionType": "share-phone",
                                "ActionBody": `buy`,
                                "Text": "<font color='#000000'>Yes</font>"
                            }, {
                                "Columns": 6,
                                "Rows": 1,
                                "BgColor": "#99FFFF",
                                "ActionType": "reply",
                                "ActionBody": `Hi`,
                                "Text": "<font color='#000000'>No</font>"
                            }]
                        }, "", "", "", 7)], [ok.id]);
                    })
                })
                    }
                })
                
                
            
            }
        }
       
        if (userInput.includes("MPT/") || userInput.includes('Telenor/') || userInput.includes('Ooredoo/') || userInput.includes('Mytel/')) {
            bot.sendMessage(response.userProfile, new TextMessage('Please type the amount you want!'), [
                [`${userInput}`]
            ])
        }
        if (!isNaN(userInput)) {
            if (message.text) {
                var trackingData = message.trackingData[0]
                if (trackingData[0].includes('MPT/') || trackingData[0].includes('Telenor/') || trackingData[0].includes('Ooredoo/') || trackingData[0].includes('MyTel/')) {
                    var text = trackingData[0]
                    text = text.split('/')
                    var amount = userInput
                    var price = text[1]
                    var denomination = price;
                    var name = text[0]
                    console.log(price)
                    price = parseInt(price)
                    console.log(price)
                    price = parseInt(userInput) * price
                    console.log(price)

                    bot.sendMessage(response.userProfile, [new TextMessage(`${name}-${denomination} Ks ${userInput} unit price is ${price},you want to calculate this price into retail price?`),
                        new KeyboardMessage({

                            "Type": "keyboard",
                            "InputFieldState": "hidden",
                            "Revision": 1,
                            "Buttons": [{
                                "Columns": 6,
                                "Rows": 1,
                                "BgColor": "#99FFFF",
                                "ActionType": "reply",
                                "ActionBody": `Calculate/${price}/${userInput}/${name}`,
                                "Text": "<font color='#000000'>Calculate</font>"
                            }, {
                                "Columns": 6,
                                "Rows": 1,
                                "BgColor": "#99FFFF",
                                "ActionType": "reply",
                                "ActionBody": `${name}/${price}`,
                                "Text": "<font color='#000000'>Back</font>"
                            }]
                        }, "", "", "", 7)
                    ]);
                }
            }
        }
    }
        
            
});
