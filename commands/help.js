const { prefix } = require('../config.json')
const { MessageEmbed } = require("discord.js")
const { helpers } = require('../utils/helpers')
module.exports = {
	name: 'help',
	description: 'List of all the commands.',
	aliases: ['commands'],
	usage: '[command name]',
    cooldown: 5,
	execute: async(client, message, args) => {
        const data = [];
        const { commands } = message.client;
        try {
        
        if (!args.length) {
            let totalSeconds = (client.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);
            let uptime = `${days}d - ${hours}h - ${minutes}m - ${seconds}s`;
            let field1 = (commands.map(command => command.name).join(', '));
            var embed = new MessageEmbed()
            .setAuthor(`${client.user.username}`, client.user.avatarURL({format: 'png', dynamic: 'true' }))
            .setThumbnail(client.user.avatarURL({format: 'png', dynamic: 'true', size: 2048 }))
            .setColor(`#FF0000`)
            .addFields(
                       { name: 'Here\'s a list of all my commands:',  value: `${field1}`},
                       { name: `\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`, value: `**Uptime:${uptime}**`})
            
            await message.author.send({embed: embed},)
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!').then(msg => {msg.delete({ timeout: 10000 })}).catch(console.error);
                    message.delete({timeout: 10000});
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?').then(msg => {msg.delete({ timeout: 10000 })}).catch(console.error);
                    message.delete({timeout: 10000});
                });
        }
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
        await message.reply('that\'s not a valid command!');
        }
        
        var embed = new MessageEmbed()
        .setColor(`#FF0000`)
        .setAuthor(`${prefix}${command.name}`, client.user.avatarURL({format: 'png', dynamic: 'true' }))
        .setThumbnail(`https://cdn.discordapp.com/attachments/774330624680001546/775089340312715294/ezgif-3-d715ee28b80c.gif`)
        .addFields(
                       { name: 'Aliases:',  value:`${command.aliases.join(', ')}`, inline: true},
                       { name: 'Description:',  value: `${command.description}`, inline: false},
                       { name: `Usage:`, value: `${prefix}${command.name} ${command.usage}`, inline: false},
                       { name: 'Cooldown:',  value: `${command.cooldown || 3} second(s)`, inline: true})
        await message.channel.send({embed: embed});
    
		
    } catch (error) {
        await console.log(`\`${error}\``)
      }

    },
};
