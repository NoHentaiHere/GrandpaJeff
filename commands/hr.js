const { MessageEmbed } = require('discord.js');
const { best_match } = require('../utils/search')


module.exports = {
    execute: async(client, message, args) => {
        const theBonk = ('https://cdn.discordapp.com/attachments/774330624680001546/797743194275708928/Screen_Shot_2020-04-28_at_12.21.48_PM.png')
        try {
            const { username, score } = best_match(message, args)
            if (!args[0]) { 
                var embed = new MessageEmbed()
                .setAuthor('Go to horny jail weirdo!', client.user.avatarURL({format: 'png', dynamic: 'true' }))
                .setImage(theBonk)
                .setColor(`#FF0000`)
                await message.channel.send({ embed: embed})
            }
            else {
                var embed = new MessageEmbed()

                if (message.mentions.users.first()) {
                    var gMember = message.guild.member(message.mentions.users.first())
                }
                else {
                    var gMember = message.guild.member(message.guild.members.cache.find(user => user.displayName === username))
                }
                if (gMember) {
                    embed.setAuthor(`Go to horny jail ${gMember.user.username}!`, gMember.user.avatarURL({format: 'png', dynamic: 'true' }))
                    embed.setImage(theBonk)
                    embed.setColor(`#FF0000`)
                    await message.channel.send({ embed: embed})
                }

                else await message.reply("The weirdo is not found. Try pinging them.")
            }
        }
        catch (error) {
            await message.channel.send(`\`${error}\``)
        }
        
    },
    name: 'hr',
    aliases: ['hr', 'hornyjail', 'horny'],
    description: "Boink someone for being a retard",
    usage: "`hr [user]`"
}