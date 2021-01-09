const axios = require('axios');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'cat',
    aliases: ['cat', 'catpic'],
    description: "Sends images of cats",
    usage: `%cat`,
    cooldown: 3,
    execute: async(client, message, args ) => {
        try{
        if(!args[0]){
            axios.get('https://api.thecatapi.com/v1/images/search').then((response) => {
                var embed = new MessageEmbed()
                .setAuthor(`${client.user.username}`, client.user.avatarURL({format: 'png', dynamic: 'true' }))
                .setColor(`#FF0000`)
                .setImage(response.data[0].url)
                message.channel.send({ embed: embed})
               
            }).catch ((error) => {
               console.error('Error:', error)
                
              })
        } else return;
            
        
 




        } catch (error) {
            await message.channel.send(`\`${error}\``)
            
          }


    
    
    
    }}