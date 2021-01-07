module.exports = {
    // Run function that will be run when the command is issued
    // Always async
    execute: async(client, message, args) => {
      // Try to run the command
        try{
          if(!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("You don't have permission to use this command")
          if(isNaN(args[0])) return message.channel.send("Enter the amount of messages you want deleted.")
          if(args[0] < 1 ) return message.channel.send("0 messages really? Stop wasting my time.")
          if(args[0] > 100 ) return message.channel.send("I can't delete more than a hundred messages at a time.")
            else {(message.channel.bulkDelete(Number(args[0])+1,))
            await message.channel.send(`Successfully deleted ${args[0]} messages.`).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
            }
        }
        catch (error) {
            console.log(error)
            await message.channel.send(`\`${error}\``)
          } // catch any errors
      
    },
    name: 'prune', // Name of command | this is used for issuing the command(required)
    category: 'moderation', // Category (optional)
    argsReq: true, // Are args required; boolean (optional)
    aliases: ['pr'], // Put aliases here (optinal)
    description: 'prunes up to 100 messages', // Description of command (optional)
    guildOnly: true, // Command only allowed in guild; boolean (optional)
    usage: '`prune <number>`' // Command usage (optional)
  }