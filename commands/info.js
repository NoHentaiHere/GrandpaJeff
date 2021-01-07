const { MessageEmbed } = require("discord.js")
const { helpers } = require('../utils/helpers')
const { best_match } = require('../utils/search')


module.exports = {
    execute: async(client, message, args) => {
        try {
            const { username, score } = best_match(message, args)
            console.log(username, score)
            roleArray = [];
            message.member.roles.cache.keyArray().forEach(x => {
                roleArray.push(message.guild.roles.resolve(x))
                roleArray.sort(helpers.sortArrayBy('rawPosition', true, parseInt))
                if (roleArray.length > 15) {
                    roles = `${roleArray.slice(0, 15).join(' ')} ...`
                }
                else {
                    roles = roleArray.join(' ')
                }
            })
            if(!args[0]){
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.username}'s information`, message.author.avatarURL({format: 'png', dynamic: 'true' }))
            .setThumbnail(message.author.avatarURL({format: 'png', dynamic: true, size: 2048}))
            .setColor(`#FF0000`)
            .addFields(
                { name: 'ID', value: message.author.id, inline: true },
                { name: 'Nickname', value: `${message.member.displayName}`, inline: true},
                { name: 'Account Created', value: message.author.createdAt, inline: false},
                { name: 'Joined On', value: message.member.joinedAt, inline: false},
                { name: `Roles [${message.member.roles.cache.keyArray().length}]`, value: roles })
            await message.channel.send({embed: embed})}
            else{
                var embed = new MessageEmbed()
                
                if (message.mentions.users.first()) {
                    var gMember = message.guild.member(message.mentions.users.first())
                    
                }
                else {
                    var gMember = message.guild.member(message.guild.members.cache.find(user => user.displayName === username))
                    
                }
                if (gMember) {
                    groleArray = [];
                    gMember.roles.cache.keyArray().forEach(x => {
                    groleArray.push(message.guild.roles.resolve(x))
                    groleArray.sort(helpers.sortArrayBy('rawPosition', true, parseInt))
                    if (roleArray.length > 15) {
                    groles = `${groleArray.slice(0, 15).join(' ')} ...`
                    }
                    else {
                    groles = groleArray.join(' ')
                    }
                    })
                    embed.setAuthor(`${gMember.user.username}'s information.`, gMember.user.avatarURL({format: 'png', dynamic: 'true' }))
                    embed.setThumbnail(gMember.user.avatarURL({format: 'png', dynamic: 'true', size: 2048 }))
                    embed.setColor(`#FF0000`)
                    embed.addFields(
                        { name: 'ID', value: gMember.id, inline: true },
                        { name: 'Nickname', value: `${gMember.displayName}`, inline: true},
                        { name: 'Account Created', value: gMember.user.createdAt, inline: false},
                        { name: 'Joined On', value: gMember.joinedAt, inline: false},
                        { name: `Roles [${gMember.roles.cache.keyArray().length}]`, value: groles })
                    await message.channel.send({ embed: embed})
                }

                else await message.reply("That user is not found. Try pinging them.")


            }

        
        }
        catch (error) {
            await message.channel.send(`\`${error}\``)
        }
    },
    name: 'info',
    category: 'utilities',
    aliases: ['userinfo', 'user'],
    description: "Displays the user's information"
}