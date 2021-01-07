const { Message } = require("discord.js")

module.exports = {
    name: 'goodnight',
    descritpion: "sends a goodnight text!",
    cooldown: 3,
    execute(client, message, args){
        message.channel.send(`Goodnight ${message.member.displayName}!`);
        
    }

}