const config = require('../config.json')
const Discord = require ('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');

module.exports = {
    execute: async(client, message, args) => {
        try {
        
            if (!message.guild) return;
                 if (message.member.voice.channel) {
                      
                      const connection = await message.member.voice.channel.join();
                      const dispatcher = connection.play(ytdl(`${args[0]}`, { filter: 'audioonly' , volume: '0.2' ,}));
                      dispatcher.on('finish', () => {
                        console.log('Finished playing!');
                      });
             
                      } else {
                      message.reply('You need to join a voice channel first!');
                       } 
                    }
                       catch (error) {
                        await message.channel.send(`\`${error}\``)
                    }
        
    },
    name: 'play',
    aliases:['play', 'vc'],
    description: 'Plays a song',
    usage: '`simpleplay`'
}  