const { MessageEmbed } = require('discord.js');
const botInfo = require('../package.json')
module.exports = {

    execute: async(client, message, args ) => {
        
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let uptime = `${days}d - ${hours}h - ${minutes}m - ${seconds}s`;
      try {
        var embed = new MessageEmbed()
        .setAuthor(`${client.user.username}`, client.user.avatarURL({format: 'png', dynamic: 'true' }))
        .setThumbnail(client.user.avatarURL({format: 'png', dynamic: 'true', size: 2048}))
        .setColor(`#FF0000`)
        .addFields(
            { name: "Development version: ", value: botInfo.version, inline: false },
            { name: "Description: ", value: botInfo.description },
            { name: "Author: ", value: `${botInfo.author} - <@214530609220026368>`, inline: false },
            { name: "Website: ", value: `<https://grandpajeff.netlify.app/>`, inline: false },
            { name: "Source Code: ", value: `<https://github.com/NoHentaiHere/GrandpaJeff>`, inline: false },
            { name: "Node.js version: ", value: process.version, inline: true },
            { name: "Discord.js version: ", value: botInfo.dependencies['discord.js'].replace('^', 'v'), inline: true },
            { name: "Memory Usage: ", value: `${Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100} MB`, inline: false },
            { name: "Current Uptime: ", value: `${uptime}` },)
        await message.channel.send({ embed: embed})
        
      }
      catch (error) {
        await message.channel.send(`\`${error}\``)
        
      }
    },
    name: 'botinfo',
    aliases: ['bot, botinfo'], 
    description: 'Shows my information', 
    usage: 'botinfo' 
  }