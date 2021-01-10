const querystring = require('querystring');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'urban',
    aliases: ['ur', 'define'],
    description: "Pulls up a definiton from urban dictionary",
    usage: `<your search input>`,
    cooldown: 3,
    execute: async(client, message, args ) => {
        const query = querystring.stringify({ term: args.join(' ') });
        var num = 0;
        const thumb = [`https://cdn.discordapp.com/attachments/774330624680001546/775089340312715294/ezgif-3-d715ee28b80c.gif`,`https://cdn.discordapp.com/attachments/774330624680001546/797736578323185714/fasdxzcvxzcv.gif`,`https://cdn.discordapp.com/attachments/774330624680001546/797736591217000458/zdvxxzcv.gif`,`https://media.discordapp.net/attachments/518065727454838784/659206359002120202/please.gif`,`https://media.discordapp.net/attachments/518065727454838784/659206359002120202/please.gif`];
        const rthumb = (thumb[Math.floor(Math.random() * thumb.length)]);
        try{
        if(!args[0]){
            message.channel.send(`You didn't search for anything`)
        }  else { 
        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
            
            if (!list.length) {
                return message.channel.send(`No results found for **${args.join(' ')}**.`);
            } else {
                if(list[num].example == "") {
                    list[num].example = "Not provided";
                }
            var embed = new MessageEmbed()
			.setColor('#FF0000')
            .setTitle(list[num].word)
            .setThumbnail(`${rthumb}`)
			.setURL(list[num].permalink)
			.addFields(
				{ name: 'Definition', value: trim(list[num].definition, 1024) },
				{ name: 'Example', value: trim(list[num].example, 1024) },
				{ name: 'Rating', value: `👍${list[num].thumbs_up}       👎${list[num].thumbs_down} ` },
			);
		    botmessage = await message.channel.send(embed)
                botmessage.react('⬅️');
                botmessage.react('➡️');
                botmessage.react('❌');
                
                
                const filter = (reaction, user) => {
                    return ['⬅️', '➡️', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
                };
                const collector =  botmessage.createReactionCollector(filter, { time: 100000 });
                collector.on('collect', reaction =>{
                    var embed = new MessageEmbed()
                    if (reaction.emoji.name === '⬅️' && num > 0) {
                        --num;
                        if(list[num].example == "") {
                            list[num].example = `Not provided`;
                        }
                        embed.setColor('#FF0000')
			            embed.setTitle(list[num].word)
                        embed.setURL(list[num].permalink)
                        embed.setThumbnail(`${thumb[Math.floor(Math.random() * thumb.length)]}`)
			            embed.addFields(
				            { name: 'Definition', value: trim(list[num].definition, 1024) },
				            { name: 'Example', value: trim(list[num].example , 1024) },
				            { name: 'Rating', value: `👍${list[num].thumbs_up}       👎${list[num].thumbs_down} ` },
                            );
                        botmessage.edit(embed);
                                    
                        
                    } else if (reaction.emoji.name === '➡️' && num <= 5 ){
                        ++num;
                        if(list[num].example == "") {
                            list[num].example = `Not provided`;
                        }
                        embed.setColor('#FF0000')
                        embed.setTitle(list[num].word)
                        embed.setThumbnail(`${thumb[Math.floor(Math.random() * thumb.length)]}`)
			            embed.setURL(list[num].permalink)
			            embed.addFields(
				            { name: 'Definition', value: trim(list[num].definition, 1024) },
				            { name: 'Example', value: trim(list[num].example , 1024) },
				            { name: 'Rating', value: `👍${list[num].thumbs_up}       👎${list[num].thumbs_down} ` },
                            );
                        botmessage.edit(embed);
                        
                    } 
                    else if (reaction.emoji.name === '❌'){
                        botmessage.delete();
                    } 
                    reaction.users.remove(reaction.users.cache.filter(user => user.id !== botmessage.author.id).first().id)
                    
                });
                
         
            
            } 
        } 
    } catch (error) {
        await message.channel.send(`\`${error}\``)
    
  }
}}