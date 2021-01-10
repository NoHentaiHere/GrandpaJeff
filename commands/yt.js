const ytsrc = require("youtube-sr");
module.exports = {
    name: 'yt',
    aliases: ['yt', 'ytsrc'],
    description: "Searches for youtube videos",
    usage: `<your search input>`,
    cooldown: 3,
    execute: async(client, message, args ) => {
        var num = 0;
        try{
        if(!args[0]){
            message.channel.send(`You didn't search for anything`)
        } else {
            ytsrc.search(`${args}`, { limit: 10 })
        .then(x => {message.channel.send(`https://youtu.be/${x[num].id}`).then(botmessage => {
        botmessage.react('⬅️');
        botmessage.react('➡️');
        botmessage.react('❌');
        const filter = (reaction, user) => {
            return ['⬅️', '➡️', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        const collector =  botmessage.createReactionCollector(filter, { time: 100000 });
        collector.on('collect', reaction =>{

            if (reaction.emoji.name === '⬅️' && num > 0) {
                botmessage.edit(`https://youtu.be/${x[--num].id}`);
                
            } else if (reaction.emoji.name === '➡️' && num <= 10 ){
                botmessage.edit(`https://youtu.be/${x[++num].id}`);
                
            }
            else if (reaction.emoji.name === '❌'){
                botmessage.edit(`<https://youtu.be/${x[num].id}>`);
               
            } 
            reaction.users.remove(reaction.users.cache.filter(user => user.id !== botmessage.author.id).first().id)
        });
            
        
    })
     
    })
    .catch(console.error);
        }
        } catch (error) {
            await message.channel.send(`\`${error}\``)
            
          }
    } 

}