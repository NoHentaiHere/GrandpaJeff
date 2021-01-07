const config = require('../config.json')
const Discord = require ('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');

module.exports = {
    execute: async(client, message, args) => {
        try {
        
            if (!message.guild) return;
                 if (message.member.voice.channel) {
                    dispatcher.resume();
             
                      } else {
                      message.reply('You need to join a voice channel first!');
                       } 
                    }
                       catch (error) {
                        await message.channel.send(`\`${error}\``)
                    }
        
    },
    name: 'resume',
    aliases:['resume', 'vc'],
    description: 'Resumes a song',
    usage: '`resume`'
}  