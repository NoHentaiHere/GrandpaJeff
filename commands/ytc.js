const ytsrc = require("youtube-sr");
module.exports = {
    name: 'ytc',
    aliases: ['ytc', 'ytchannel'],
    description: "Searches for youtube channels",
    usage: `<your search input>`,
    cooldown: 3,
    execute: async(client, message, args ) => {
        var num = 0;
        try{
        if(!args[0]){
            message.channel.send(`You didn't search for anything`)
        } else {
            ytsrc.search(`${args}`, { limit: 10 })
        .then(x => {message.channel.send(`https://www.youtube.com/channel/${x[num].channel.id}`).then(botmessage => {
        botmessage.react('⬅️');
        botmessage.react('➡️');
        botmessage.react('❌');
        const filter = (reaction, user) => {
            return ['⬅️', '➡️', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        const collector =  botmessage.createReactionCollector(filter, { time: 60000 });
        collector.on('collect', reaction =>{

            if (reaction.emoji.name === '⬅️' && num > 0) {
                botmessage.edit(`https://www.youtube.com/channel/${x[--num].channel.id}`);
                
            } else if (reaction.emoji.name === '➡️' && num <= 10 ){
                botmessage.edit(`https://www.youtube.com/channel/${x[++num].channel.id}`);
                
            }
            else if (reaction.emoji.name === '❌'){
                botmessage.edit(`<https://www.youtube.com/channel/${x[num].channel.id}>`);
               
            } 
            reaction.users.remove(reaction.users.cache.filter(user => user.id !== botmessage.author.id).first().id)
        });
        const deleteReactions = function(){
            botmessage.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
        }
        setTimeout(deleteReactions, 60000) 
    })
     
    })
    .catch(console.error);
        }
        } catch (error) {
            await message.channel.send(`\`${error}\``)
            
          }
    } 

}