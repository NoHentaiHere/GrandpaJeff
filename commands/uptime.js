
const { MessageEmbed } = require('discord.js');

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
        .setThumbnail(`https://cdn.discordapp.com/attachments/774330624680001546/775084777610412060/dcnljfk-7c7c53cc-69a0-4bf0-975c-375431761d2c.gif`)
        .setColor(`#FF0000`)
        .addFields({ name: "Current Uptime", value: `${uptime}` })
        await message.channel.send({ embed: embed})
        
      }
      catch (error) {
        await message.channel.send(`\`${error}\``)
        
      }
    },
    name: 'uptime',
    aliases: ['up'], 
    description: 'Shows bot runtime', 
    usage: '`uptime`' 
  }