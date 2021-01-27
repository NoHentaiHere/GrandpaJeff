const mongo = require('../mongo');
const config = require('../config.json')
const mongoose = require('mongoose')
const lastFMSchema = require('../schemas/lastfm-schema')
const { MessageEmbed } = require('discord.js')
const{prefix, lastfm} = require('../config.json');
const http = require('http')
module.exports = {

    execute: async(client, message, args ) => {
        try {
          
          if (args[0] === 'set'){
            var embed = new MessageEmbed();
            var uname = args
            
            if(uname.length < 2) {
                var embed = new MessageEmbed();
                embed.setAuthor(`${prefix}fm`, client.user.avatarURL({format: 'png', dynamic: 'true' }))
                .setTitle(`Type in a username`)
                .setURL('https://grandpajeff.netlify.app/')
                .setDescription(`Please set or update your lastfm username: **${prefix}fm set <username>**`)
                .setColor('#FF0000')
                await message.channel.send({ embed: embed})
                return
            }
            uname.shift()
            uname = uname.join(' ')
            console.log(uname)
            await mongo().then(async (mongoose) => {
              try {
                  let userData = await lastFMSchema.findOneAndUpdate({
                      userID: message.author.id,
                  },{
                      userID: message.author.id,
                      username: uname,
              
                      }, {
                          upsert: true,
                      })
                  } finally {
                  console.log('Saved to database')
                  mongoose.connection.close()
                  var embed = new MessageEmbed();
                  embed.setAuthor(`${prefix}fm`, client.user.avatarURL({format: 'png', dynamic: 'true' }))
                 .setTitle(`Username set to: ${uname}`)
                 .setURL('https://grandpajeff.netlify.app/')
                 .setColor('#FF0000')
                await message.channel.send({ embed: embed})
                return
          }
          })
            
            } else {
            await mongo().then( async mongoose =>{
            try{
            if (message.mentions.users.first()) {
              let userData = await lastFMSchema.findOne({ userID: message.mentions.users.first().id })
                if (!userData) return await message.reply("That user hasn't set their username.")
                var uname = userData.username
                let url = `http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${uname}&api_key=${lastfm}&limit=2&format=json`
                http.get(url, function(response) {
                  var body = '';
          
                  response.on('data', function(chunk) {
                    body += chunk;
                  });
                  response.on('end', function() {
                    body =  JSON.parse(body);
                    if (!body.recenttracks) return message.reply('user not found.')
                    if (!body.recenttracks.track[0]) return message.reply("no scrobbles.")
                    if (body.recenttracks.track[0]['@attr']) { 
                      var nowPlaying = true
                    }
                    else { 
                      var nowPlaying = false
                    }
          
                    const embed = new MessageEmbed()
                      .addFields(
                        { name: 'Artist', value: body.recenttracks.track[0].artist['#text'], inline: true},
                        { name: 'Title', value: body.recenttracks.track[0].name, inline: true}
                      )
                      .setThumbnail(body.recenttracks.track[0].image[3]['#text'])
          
                    if (nowPlaying) embed.setAuthor(`${body.recenttracks['@attr'].user} — Now playing`, message.mentions.users.first().avatarURL({type: 'png', dynamic: true}), `https://last.fm/user/${uname}`)
                    else embed.setAuthor(`${body.recenttracks['@attr'].user} – Last played`, message.mentions.users.first().avatarURL({type: 'png', dynamic: true}), `https://last.fm/user/${unam}`)
          
                    embed.setFooter(`${body.recenttracks['@attr'].user} has ${body.recenttracks['@attr'].total} scrobbles.`)
                    .setColor('#FF0000')
          
                    message.channel.send({embed: embed})
                  })
                }).on('error', (e) => {
                  message.channel.send(`\`${e}\``)
                })
            } else if (userData = await lastFMSchema.findOne({ userID: message.author.id })){ 
              var uname = userData.username
              let url = `http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${uname}&api_key=${lastfm}&limit=2&format=json`
              http.get(url, function(response) {
                var body = '';
        
                response.on('data', function(chunk) {
                  body += chunk;
                });
                response.on('end', function() {
                  body =  JSON.parse(body);
                  if (!body.recenttracks) return message.reply('user not found.')
                  if (!body.recenttracks.track[0]) return message.reply("no scrobbles.")
                  if (body.recenttracks.track[0]['@attr']) { 
                    var nowPlaying = true
                  }
                  else { 
                    var nowPlaying = false
                  }
        
                  const embed = new MessageEmbed()
                    .addFields(
                      { name: 'Artist', value: body.recenttracks.track[0].artist['#text'], inline: true},
                      { name: 'Title', value: body.recenttracks.track[0].name, inline: true}
                    )
                    .setThumbnail(body.recenttracks.track[0].image[3]['#text'])
        
                  if (nowPlaying) embed.setAuthor(`${body.recenttracks['@attr'].user} — Now playing`, message.author.avatarURL({type: 'png', dynamic: true}), `https://last.fm/user/${uname}`)
                  else embed.setAuthor(`${body.recenttracks['@attr'].user} – Last played`, message.author.avatarURL({type: 'png', dynamic: true}), `https://last.fm/user/${uname}`)
        
                  embed.setFooter(`${body.recenttracks['@attr'].user} has ${body.recenttracks['@attr'].total} scrobbles.`)
                  .setColor('#FF0000')
        
                  message.channel.send({embed: embed})
                })
              }).on('error', (e) => {
                message.channel.send(`\`${e}\``)
              })
            }
            else {
              var embed = new MessageEmbed();
                embed.setAuthor(`${prefix}fm`, client.user.avatarURL({format: 'png', dynamic: 'true' }))
                .setTitle(`Seems you haven't set your username`)
                .setURL('https://grandpajeff.netlify.app/')
                .setDescription(`Please set your lastfm username: **${prefix}fm set <username>**`)
                .setColor('#FF0000')
                await message.channel.send({ embed: embed})
                return
            }} finally{
              mongoose.connection.close()
            }
          });
        }

        
        

        } catch(err){
          console.log(err);
        }
        
    },
    name: 'lastfm',
    aliases: ['fm', 'lastfm'], 
    description: 'Shows lastfm playing status', 
    usage: '``' 
  }