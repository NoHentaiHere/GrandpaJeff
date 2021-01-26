const Discord = require ('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');
const cooldowns = new Discord.Collection();
const mongo = require('./mongo');
const welcome = require('./features/setwelcome')
const leave = require('./features/setleave')





let token, prefix;
try {
  const config = require("./config.json");
  token = config.token;
  prefix = config.prefix;
} catch (error) {
  token = process.env.token;
  prefix = process.env.prefix;
}



client.login(token);

client.commands = new Discord.Collection();


 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}



client.on('ready', async () => {
    console.log('Online');
    client.user.setActivity("%help | devouring souls", { type: "STREAMING", url: "https://twitch.tv/gelulain" }, ).catch(console.error);
    welcome(client);
    leave(client);
});





//MONGO-DB

const connectToMongoDB = async () => {
  await mongo().then((mongoose) =>{
    try{
      console.log('Connected to the database!')
    }
    finally {
    mongoose.connection.close()
    }
  })
}
connectToMongoDB()




//COMMAND TREE
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return; 
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    if (command.guildOnly && message.channel.type !== 'text') {
      return message.reply('I can\'t execute that command inside DMs!');
    }
    if (command.args && !args.length) {
        return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
    if (timestamps.has(message.author.id)) {
      // ...
    }
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        try {
          command.execute(client, message, args);
              } catch (error) {
                  console.error(error);
                   message.reply('there was an error trying to execute that command!');
}
});


//EasterEggs

client.on("message", (message) => {

    
    if (message.content == "shut up woman") {
      
      message.channel.send({files:["https://cdn.discordapp.com/attachments/224116720233611264/770064295857356800/shutupwoman.mp4"]});
    }
    
    if (message.content == "goodbye people") {
      
      message.channel.send({files:["https://cdn.discordapp.com/attachments/480547170076852235/733313606166511737/korones_secret.mp4"]});
    } 
    if (message.content == "fuck you jeff") {
      
      message.channel.send("Fuck you too");
    } 
    if (message.content == "Are you?") {
      
      message.channel.send({files:["https://cdn.discordapp.com/attachments/441602084681547776/734482821179113486/video0_27_2.mp4"]});
    }
    if (message.content == "You know what i think?") {
      message.channel.send({files: [ "https://cdn.discordapp.com/attachments/224116720233611264/744680765274456074/video0_15.mp4"]});
    }
    if (message.content == "im playing league") {
      message.reply("Are you okay? Do you need help?")
    }
  });

  

 
