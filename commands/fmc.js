const http = require('http')
const {lastfm} = require('../config.json')
var fs = require('fs');
const { createCollage } = require('@mtblc/image-collage');
const lastFMSchema = require("../schemas/lastfm-schema");
const { MessageEmbed, MessageAttachment } = require('discord.js');
const mongo = require('../mongo');

module.exports = {
    execute: async(client, message, args ) => {


        const urlBuilder = (username, timespan) => {
            let url = `http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${username}&period=${timespan}&api_key=${lastfm}&format=json`
            return url;
        }

        const genCollage = (images, username) => {
            const collageWidth = 1000;
            createCollage(images, collageWidth).then((imageBuffer) => {
                fs.writeFileSync("out.png", imageBuffer);

                const file = new MessageAttachment('out.png');

                const imagecol = new MessageEmbed()
                .setAuthor(username, message.author.avatarURL({type: 'png'}))
                .setColor('#FF0000')
                .setImage('attachment://out.png')

                message.channel.send({files: [file], embed: imagecol})
              });
            
        }

        const getAlbums = (builtURL, username) => {
            message.channel.startTyping();

            http.get(builtURL, async function(response) {
                var body = '';
                response.on('data', function(chunk) {
                body += chunk;
                });
    
                response.on('end', async function() {
                    covers = [];
                    let n = 0
                    while (n < 9) {
                        try{
                        if (!JSON.parse(body).topalbums.album[n].image[3]['#text']) {
                            covers.push('https://live.staticflickr.com/3804/8788210204_4b9b45becb.jpg')
                            n++;    
                        }
                        else {
                            covers.push(JSON.parse(body).topalbums.album[n].image[3]['#text']);
                            n++;
    
                        }
                    } catch (error) {
                        await message.channel.send(`\`\`\`Either cannot find user "${args[0]}" or you misstyped time. Correct use '7day', '1month', '3month', '6month', '1year', 'overall'\`\`\` `)
                        message.channel.stopTyping();
                        return;
                      }
                    }
                    genCollage(covers, username)
                    message.channel.stopTyping();

                })
    
            }).on('error', (e) => {
            message.channel.send(`\`${e}\``)
            })
        }


        const checkDB = async (message) => {
            
                    if (doc = await lastFMSchema.findOne({ userID: message.author.id })) {
                        return doc;
                    }
                    else {
                        var embed = new MessageEmbed();
                embed.setAuthor(`${prefix}fm`, client.user.avatarURL({format: 'png', dynamic: 'true' }))
                .setTitle(`Seems you haven't set your username`)
                .setURL('https://grandpajeff.netlify.app/')
                .setDescription(`Please set your lastfm username: **${prefix}fm set <username>**`)
                .setColor('#FF0000')
                await message.channel.send({ embed: embed})
                return
                    
            
        }
    }

        if (message.mentions.users.first()) {
            await mongo().then(async (mongoose) => {
                try {
                    doc = await lastFMSchema
                   .findOne({ userID: message.mentions.users.first().id })
                  .catch(err => console.log(err));

            if (!doc) return await message.reply("that user hasn't set their username.")

            var username = doc.username
                } finally {
                    mongoose.connection.close()
            }
            }) 
        }


        else if (args[0]) {
            await mongo().then(async (mongoose) => {
                try {
            switch (args[0]) {
                case '7day':
                    var doc = await checkDB(message)
                    var username = doc.username
                    timespan = args[0]
                    getAlbums(urlBuilder(username, timespan), username)
                    break;
                case '1month':
                    var doc = await checkDB(message)
                    var username = doc.username
                    timespan = args[0]
                    getAlbums(urlBuilder(username, timespan), username)
                    
                    break;

                case '3month':
                    var doc = await checkDB(message)
                    var username = doc.username
                    timespan = args[0]
                    size = args[1] || '3'
                    getAlbums(urlBuilder(username, timespan), username)
                    break;

                case '6month':
                    var doc = await checkDB(message)
                    var username = doc.username
                    timespan = args[0]
                    getAlbums(urlBuilder(username, timespan), username)
                    break;
                case '1year':
                    var doc = await checkDB(message)
                    var username = doc.username
                    timespan = args[0]
                    getAlbums(urlBuilder(username, timespan), username)
                    break;

                case 'overall':
                    var doc = await checkDB(message)    
                    var username = doc.username
                    timespan = args[0]
                    getAlbums(urlBuilder(username, timespan), username)
                    break;

                default: 
                try{
                    var username = args[0]
                    timespan = args[1] || '7day'
                    getAlbums(urlBuilder(username, timespan), username)
                }
                catch (error) {
                    await console.log(`\`${error}\``)
                  }
                    break;

            } } finally {
                mongoose.connection.close()
        }
        })
        }
        else if (!args[0]) {
            await mongo().then(async (mongoose) => {
                try {
                    if (doc = await lastFMSchema.findOne({ userID: message.author.id })) {
                        var username = doc.username
                        timespan = '7day'
                        getAlbums(urlBuilder(username, timespan), username)
                    }
                    else {
                        var embed = new MessageEmbed();
                        embed.setAuthor(`${prefix}fm`, client.user.avatarURL({format: 'png', dynamic: 'true' }))
                        .setTitle(`Seems you haven't set your username`)
                        .setURL('https://grandpajeff.netlify.app/')
                        .setDescription(`Please set your lastfm username: **${prefix}fm set <username>**`)
                        .setColor('#FF0000')
                        await message.channel.send({ embed: embed})
                        return
                    }
                    
                } finally {
                    mongoose.connection.close()
            }
            }) 

        }
        /*
        await mongo().then(async (mongoose) => {
            try {
                
            } finally {
                mongoose.connection.close()
        }
        }) 
        */

    },
    name: 'fmc',
    category: 'last.fm',
    aliases: ['collage'],
    usage: '`fmc [username] [timeframe] (timeframes are: 7day, 1month, 3month, 6month, 1year, and overall)`',
    description: 'Gets last.fm album collage'
    }