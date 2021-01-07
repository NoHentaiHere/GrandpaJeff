const config = require('../config.json')
module.exports = {
    execute: async(client, message, args) => {
        
        
            if (!message.guild) return;
                 if (message.member.voice.channel) {
                      const connection = await message.member.voice.channel.leave();
                      } else {
                      message.reply('You need to join a voice channel first!');
                       } return;
                
        
         
        
    },
    name: 'disconnect',
    aliases:['disconnect', 'vc'],
    description: 'Disconnects a voice chat',
    usage: '`disconnect`'
}