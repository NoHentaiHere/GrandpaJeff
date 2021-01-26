module.exports = {
    name: 'website',
    aliases: ['web', 'page', 'website'],
    description: "Directs you to my website",
    usage: `%website`,
    cooldown: 3,
    execute(client, message, args ){
        if(!args[0]) message.channel.send("https://grandpajeff.netlify.app/")
            else{
                return;
            }   
    }

}