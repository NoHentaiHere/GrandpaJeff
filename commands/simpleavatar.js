module.exports = {
    name: 'simpleavatar',
    aliases: ['icon', 'pfp'],
    description: "shows users avatar in a very simplistic way",
    usage: `%simpleavatar`,
    cooldown: 3,
    execute(client, message, args ){
        const taggedUser = message.mentions.users.first();
    
            if (!message.mentions.users.size) {
                message.channel.send(message.author.displayAvatarURL());
                
            } else {
                message.channel.send(taggedUser.displayAvatarURL());
            } 
            return;
            
            
            
        
    }

}