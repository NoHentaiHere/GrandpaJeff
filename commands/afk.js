const mongo = require("../mongo")
const afkSchema = require("../schemas/afk-schema")
const { MessageEmbed } = require('discord.js');
const {prefix} = require('../config.json')
module.exports = {
    name: 'afk',
    aliases: ['afk', 'brb'],
    description: "AFK command, notifies people that you\n are afk if they ping you",
    usage: "`[message]`, `set [message]`",
    execute: async(client, message, args) => {
        const subject = message.author.id
        const name = message.author.username
        if (args[0] === 'set'){
            var embed = new MessageEmbed();
            var wmsg = args
            
            if(wmsg.length < 2) {
                var embed = new MessageEmbed();
                embed.setAuthor(`${prefix}afk`, client.user.avatarURL({format: 'png', dynamic: 'true' }))
                .setTitle('Type a custom message')
                .setURL('https://grandpajeff.netlify.app/')
                .setDescription(`Please type in a message of your choice: **${prefix}afk set <message>**`)
                .setFooter(`This message will be sent once you are back.`)
                .setColor('#FF0000')
                await message.channel.send({ embed: embed})
                return
            }
            wmsg.shift()
            wmsg = wmsg.join(' ')
            console.log(wmsg)
            await mongo().then(async (mongoose) => {
                try {
                    await afkSchema.findOneAndUpdate({
                        _id: subject,
                    },{
                        _id: subject,
                        welcomemessage: wmsg,
                
                        }, {
                            upsert: true,
                        })
                } finally {
                    console.log('Saved to database')
                    embed.setAuthor(`${prefix}afk`, client.user.avatarURL({format: 'png', dynamic: 'true' }))
                    .setColor(`#FF0000`)
                    .setTitle(`Welcome back message set to:`)
                    .setURL('https://grandpajeff.netlify.app/')
                    .setDescription(`**${wmsg}**`)
                    .setFooter(`Custom message has been set for when you come back`)
                        await message.channel.send({ embed: embed})
                    mongoose.connection.close()
                }})
            
            } else if(!args[0]){
               await mongo().then( async mongoose =>{
               try{
            
             const result = await afkSchema.findOne({ _id: subject })

             if(!result){
                var embed = new MessageEmbed();
                embed.setAuthor(`${prefix}afk`, client.user.avatarURL({format: 'png', dynamic: 'true' }))
                .setTitle(`You don't have a status`)
                .setURL('https://grandpajeff.netlify.app/')
                .setDescription(`Try setting it with: **${prefix}afk <status>**`)
                .setFooter(`You can also set a custom message for when you come back with ${prefix}afk set <message>`)
                .setColor('#FF0000')
                await message.channel.send({ embed: embed})
                return;
             } else {
                const facts = ['4815162342 lines of code!','90% bug free!','Absolutely no memes!','Call your mother!','Cough or sneeze into your elbow!','Déjà vu!',`Doesn't use the U-word!`,`Don't feed avocados to parrots!`,'Go to the dentist!','Haha, LOL!','	if not ok then return end','Jason! Jason! Jason!','Look mum, I’m in a splash!','OICU812!','See you space cowboy!',`🎵 You don't seem to understand 🎶`, `Headshots never work`,'Something funny!','Truly based','Uninstall league','schöne dame']
                const rfacts = (facts[Math.floor(Math.random() * facts.length)]);
                var embed = new MessageEmbed(); 
                        embed.setAuthor(`${prefix}afk`, client.user.avatarURL({format: 'png', dynamic: 'true' }))
                        .setColor(`#FF0000`)
                        .setTitle(`${message.member.user.tag} is now AFK`)
                        .setURL('https://grandpajeff.netlify.app/')
                        .setFooter(`${rfacts}`)
                        await message.channel.send({ embed: embed})
                var listener = message => {
                    if (message.mentions.has(subject) && !message.author.bot) {
                        message.reply(`they are currently afk. Their status: ${result.text}`);
                    };
                    if(message.author.bot){
                        return;
                    } else if (message.author.id === subject) {
                        if(!result.welcomemessage){
                        message.channel.send(`Welcome back ${name}`);
                        } else{
                            message.channel.send(`${result.welcomemessage}`)
                        }
                        client.removeListener('message', listener);
                        return;
                    } 
                    
                  };
                client.on('message', listener);
             }
            }finally {
                mongoose.connection.close()
            }

        })
                
            } else {
                const { content } = message
                let text = content
                const split = text.split(' ')
                split.shift()
                text = split.join(' ')
                await mongo().then(async (mongoose) => {
                    try {
                        await afkSchema.findOneAndUpdate({
                            _id: subject,
                        },{
                            _id: subject,
                            text,
                            
                    
                            }, {
                                upsert: true,
                            })

                            const result = await afkSchema.findOne({ _id: subject })
                            var listener = message => {
                                if (message.mentions.has(subject) && !message.author.bot) {
                                    message.reply(`they are currently afk. Their status: ${result.text}`);
                                };
                                if(message.author.bot){
                                    return;
                                } else if (message.author.id === subject) {
                                    if(!result.welcomemessage){
                                    message.channel.send(`Welcome back ${name}`);
                                    } else{
                                        message.channel.send(`${result.welcomemessage}`)
                                    }
                                    client.removeListener('message', listener);
                                    return;
                                } 
                                
                              };
                            client.on('message', listener);
                    } finally {
                        console.log('Saved to database');
                        var embed = new MessageEmbed(); 
                        embed.setAuthor(`${prefix}afk`, client.user.avatarURL({format: 'png', dynamic: 'true' }))
                        .setColor(`#FF0000`)
                        .setTitle(`AFK message set to:`)
                        .setURL('https://grandpajeff.netlify.app/')
                        .setDescription(`**${text}**`)
                        .setFooter(`${message.member.user.tag} is now AFK.`)
                        await message.channel.send({ embed: embed})
                        mongoose.connection.close()
                    }})
                    
            }
    }

}