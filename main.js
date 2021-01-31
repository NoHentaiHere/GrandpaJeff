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
    client.user.setActivity(`${config.prefix}help | Active in ${client.guilds.cache.size} servers!`, {type: 'STREAMING', url: 'https://twitch.tv/gelulain'}).catch(console.error);
    const status1 = [`${config.prefix}help | devouring souls`, `STREAMING`, `https://twitch.tv/gelulain`]
    const status2 = [`${config.prefix}help | https://grandpajeff.netlify.app/`, `PLAYING`, `https://grandpajeff.netlify.app/`]
    const status3 = [`${config.prefix}help | Active in ${client.guilds.cache.size} servers`, `PLAYING`, `https://twitch.tv/gelulain`]
    const status4 = [`${config.prefix}help | 🎵 Say you can hear - Men I Trust 🎶`, `LISTENING`, `https://twitch.tv/gelulain`]
    const status5 = [`${config.prefix}help | 🎵 And you don't seem to understand 🎶`, `LISTENING`, `https://twitch.tv/gelulain`]
    const status6 = [`${config.prefix}help | 🎵 One more love song - Mac DeMarco 🎶`, `LISTENING`, `https://twitch.tv/gelulain`]
    const status7 = [`${config.prefix}help | ${config.prefix}website`, `PLAYING`, `https://twitch.tv/gelulain`]
    const status8 = [`${config.prefix}help | devouring souls`, `PLAYING`, `https://twitch.tv/gelulain`]
    const status9 = [`${config.prefix}help | Ever heard of the wired?`, `PLAYING`, `https://twitch.tv/gelulain`]
    const status10 = [`${config.prefix}help | ${config.prefix}source`, `PLAYING`, `https://twitch.tv/gelulain`]
    const statuses = [status1, status2, status3, status4, status5, status6, status7, status8, status9, status10]
    setInterval(function(){
      var rstatus = (statuses[Math.floor(Math.random() * statuses.length)]);
      client.user.setActivity(rstatus[0], {type: rstatus[1], url: rstatus[2]}).catch(console.error);
      console.log('status changed')
    }, 3600000)
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
        return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
       
    
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

    
    if (message.content.toLowerCase() == "shut up woman") {
      
      message.channel.send({files:["https://cdn.discordapp.com/attachments/224116720233611264/770064295857356800/shutupwoman.mp4"]});
    }
    
    if (message.content.toLowerCase() == "goodbye people") {
      
      message.channel.send({files:["https://cdn.discordapp.com/attachments/480547170076852235/733313606166511737/korones_secret.mp4"]});
    } 
    if (message.content.toLowerCase() == "fuck you jeff") {
      
      message.channel.send("Fuck you too");
    } 
    if (message.content.toLowerCase() == "are you?") {
      
      message.channel.send({files:["https://cdn.discordapp.com/attachments/441602084681547776/734482821179113486/video0_27_2.mp4"]});
    }
    if (message.content.toLowerCase() == "you know what i think?") {
      message.channel.send({files: [ "https://cdn.discordapp.com/attachments/224116720233611264/744680765274456074/video0_15.mp4"]});
    }
    if (message.content.toLowerCase().includes("im playing league")) {
      message.channel.send(`Are you okay <@${message.author.id}>? Do you need help?`)
    }
  });

  

 
