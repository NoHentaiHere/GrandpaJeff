const axios = require('axios');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'meme',
    aliases: ['maymay', 'funny', 'm'],
    description: "Sends funny discord memes haha...",
    usage: `%meme`,
    cooldown: 3,
    execute: async(client, message, args ) => {
        try{
        if(!args[0]){
            axios.get('https://meme-api.herokuapp.com/gimme').then((response) => {
                var embed = new MessageEmbed()
                embed.setAuthor(response.data.author, client.user.avatarURL({format: 'png', dynamic: 'true' }))
                embed.setTitle(response.data.title)
                embed.setColor(`#FF0000`)
                embed.setImage(response.data.url)
                embed.addFields(
                    {name: 'PostLink:', inline: true, value: response.data.postLink, inline: true},
                    {name: '⬆️', inline: true, value: response.data.ups, inline: true},
                    {name: 'Subreddit:', inline: true, value: response.data.subreddit, inline: true})
                message.channel.send({ embed: embed})
            
                
            }).catch ((error) => {
               console.error('Error:', error)
                
              })
        } else return;
            
        
 




        } catch (error) {
            await message.channel.send(`\`${error}\``)
            
          }


    
    
    
    }}