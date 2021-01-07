module.exports = {
    name: 'source',
    aliases: ['code', 'source', 'sourcecode'],
    description: "shows my source code",
    usage: `%source`,
    cooldown: 3,
    execute(client, message, args ){
        if(!args[0]) message.channel.send("https://github.com/NoHentaiHere/GrandpaJeff")
            else{
                return;
            }   
    }

}