module.exports = {
    name: 'args-info',
    aliases: ['args'],
    description: "Tests arguments",
    usage: "`args-info [argument]`",
    args: true,
    execute(client, message, args){
        
        if (args[0] === 'what soul am i') {
	
            return message.channel.send('true');
        }
    
        message.channel.send(`First argument: ${args[0]}`);
        message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
        
        
    }

}