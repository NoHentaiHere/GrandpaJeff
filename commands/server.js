module.exports = {
    name: 'server',
    descritpion: "says the name of the server and member count!",
    cooldown: 5,
    execute(client, message, args ){
        message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
        
    }

}