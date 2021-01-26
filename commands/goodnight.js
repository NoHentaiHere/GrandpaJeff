const { Message } = require("discord.js")

module.exports = {
    name: 'goodnight',
    descritpion: "sends a goodnight text!",
    cooldown: 3,
    args: false,
    execute: async(client, message, args) =>{
        const second = 1000;
        const minute = 60 * second;
        const hour = 60 * minute;
        const subject = message.author.id
        const name = message.author.username
        message.channel.send(`Goodnight ${name}!`);
        var remainingTime = 2;
            console.log(`started! ${remainingTime} hours`);
            let clock = setInterval(() => {
                remainingTime--;
                if (remainingTime == 1)
                console.log(`${remainingTime} hours remain.`);
                if (remainingTime == 0) {
                    clearInterval(clock);
                }
                
              }, 1 * hour);
        var listener = message => {
            if (message.mentions.has(subject) && !message.author.bot) {
                message.reply(`${name} is currently asleep.`);
            };
            if(message.author.bot){
                return;
            } 
            console.log(remainingTime)
            //clock
            if (message.author.id === subject && remainingTime == 0) {
                    message.channel.send(`Goodmorning ${name}!`)
                    client.removeListener('message', listener);
                    return;
                } else if(message.author.id === subject && remainingTime != 0){
                    message.channel.send(`Shouldn't you be aslep ${name}?`)
                    client.removeListener('message', listener);
                    return;
                }
                
            
          };
        client.on('message', listener);

        
    }

}