module.exports = client => {
    const channelId = '765124850696060948'
    client.on('guildMemberAdd', member => {   
        console.log(member)
      const message = `Dobrodosao <@${member.id}>`
      const channel = member.guild.channels.cache.get(channelId)
      channel.send(message)
      })
}