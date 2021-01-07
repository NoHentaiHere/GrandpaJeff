const config = require('../config.json')
module.exports = {
    execute: async(client, message, args) => {
        
            
        
         try {
        
            const responses = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely",
            "You may rely on it", "As I see it yes", "Most likely", "Outlook good", "Yes",
            "Signs point to yes", "Reply hazy. Try again", "Ask again later",
            "Better not tell you now", "Cannot predict now", "Concentrate and ask again",
            "No comment", "Don't count on it", "My reply is no", "My sources say no",
            "Outlook not so good", "Very doubtful", "Not as I see it", "No. Never", "Absolutely not",
            "I doubt it","True","TRUE"]

            if (args[0] === 'whatsoulami'){
                await message.channel.send('True')
                return;
            }
            if (args[0] === 'kekw?'){
                await message.channel.send('Please do us all a favor and stop existing')
                return;
            }
            if (args[0] === 'kekw'){
                await message.channel.send('Please do us all a favor and stop existing')
                return;
            }
                if (!args[0]) {
                    await message.reply(`You didn't ask a question.`)
                    return;
                }
                await message.channel.send(responses[Math.floor(Math.random() * responses.length)])
                
            }
            catch (error) {
                await message.channel.send(`\`${error}\``)
                return;
            } 
             
            
        
    },
    name: 'ask',
    aliases:['ball', '8ball'],
    description: 'Ask me something',
    usage: '`ask <question>`'
}