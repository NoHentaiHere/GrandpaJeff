const config = require('../config.json')
module.exports = {
    execute: async(client, message, args) => {
        
        
            if (!message.guild) return;
                 if (message.member.voice.channel) {
                      const connection = await message.member.voice.channel.join();
                      } else {
                      message.reply('You need to join a voice channel first!');
                       } return;
                
        
         
        
    },
    name: 'join',
    aliases:['join', 'vc'],
    description: 'Joins a voice chat',
    usage: '`ask <question>`'
}