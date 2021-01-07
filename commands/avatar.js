const { MessageEmbed } = require('discord.js');
const { best_match } = require('../utils/search')


module.exports = {
    execute: async(client, message, args) => {
        try {
            const { username, score } = best_match(message, args)
            console.log(username, score)
            if (!args[0]) { 
                var embed = new MessageEmbed()
                .setAuthor(`${message.author.username}'s avatar.`, message.author.avatarURL({format: 'png', dynamic: 'true' }))
                .setImage(message.author.avatarURL({format: 'png', dynamic: 'true', size: 2048 }))
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
                    embed.setAuthor(`${gMember.user.username}'s avatar.`, gMember.user.avatarURL({format: 'png', dynamic: 'true' }))
                    embed.setImage(gMember.user.avatarURL({format: 'png', dynamic: 'true', size: 2048 }))
                    embed.setColor(`#FF0000`)
                    await message.channel.send({ embed: embed})
                }

                else await message.reply("That user is not found. Try pinging them.")
            }
        }
        catch (error) {
            await message.channel.send(`\`${error}\``)
        }
        
    },
    name: 'avatar',
    aliases: ['av'],
    description: "Yoink someones avatar",
    usage: "`avatar [user]`"
}