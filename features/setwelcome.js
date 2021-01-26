
const command = require('../utils/command')
const mongo = require('../mongo');
const welcomeSchema = require("../schemas/welcome-schema");
const { MessageEmbed } = require('discord.js');
const {prefix} = require('../config.json')
module.exports = (client) => {
    const cache = {}
    command(client, 'setwelcome', async (message) => {
        
        const { guild, content, channel, member} = message
        if(!message.member.permissions.has("ADMINISTRATOR")) { message.channel.send(`You don't have perms`)
        return
        }
    let text = content
    const split = text.split(' ')
    if(split.length < 2) {
        var embed = new MessageEmbed();
        embed.setAuthor(`${prefix}setwelcome`, client.user.avatarURL({format: 'png', dynamic: 'true' }))
                .setTitle('Please type in a welcome message.')
                .setURL('https://grandpajeff.netlify.app/')
                .setDescription(`You can use parameters: \n**<@> <servername> <withoutping> <membercount> <displayname>** \nThey will get replaced with their respective data.`)
                .setFooter(`You can also set a leave message with: ${prefix}setleave <message>`)
                .setColor('#FF0000')
                await message.channel.send({ embed: embed})
        return
    }
    split.shift()
    text = split.join(' ')

    cache[guild.id] = [channel.id, text]

    await mongo().then(async (mongoose) => {
        try {
            await welcomeSchema.findOneAndUpdate({
                _id: guild.id,
            },{
                _id: guild.id,
                channelId: channel.id,
                text,
        
                }, {
                    upsert: true,
                })
        } finally {
            console.log('Saved to database')
            var embed = new MessageEmbed(); 
                        embed.setAuthor(`${prefix}setwelcome`, client.user.avatarURL({format: 'png', dynamic: 'true' }))
                        .setColor(`#FF0000`)
                        .setTitle('Welcome message set to:')
                        .setURL('https://grandpajeff.netlify.app/')
                        .setDescription(`**${text}**\n\nChannel: <#${channel.id}>`)
                        await message.channel.send({ embed: embed})
            mongoose.connection.close()
        }})
    })
    const onJoin = async member =>{
        
        const { guild } = member

        let data = cache[guild.id]

        if (!data) {
            console.log('Fetching from database!')
            await mongo().then( async mongoose => {
            try{
             const result = await welcomeSchema.findOne({ _id: guild.id })

             cache[guild.id] = data = [result.channelId, result.text]

            }finally {
                mongoose.connection.close()
            }

            }) 
        }
    const channelId = data[0]
    const text = data[1]
    const channel = guild.channels.cache.get(channelId)
    var mapOBJ = {
        "<@>": `<@${member.id}>`,
        "<servername>": `${guild.name}`,
        "<withoutping>": `${member.user.tag}`,
        "<membercount>": `${guild.memberCount}`,
        "<displayname>": `${member.displayName}`
    }
    channel.send(text.replace(/<@>|<servername>|<withoutping>|<membercount>|<displayname>/gi, function(matched){
        return mapOBJ[matched]
    }));
    }
    client.on('guildMemberAdd', member => {   
        onJoin(member)
      });

    
    }
