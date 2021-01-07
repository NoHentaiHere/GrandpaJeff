const Discord = require(`discord.js`);
module.exports = {
    execute: async(client, message, args) => {
        {

            let User = args[0];
            let Reason = args.slice(1).join(` `);
            if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send(`You don't have perms`)
            else {
            if (!User) return message.reply(`Who are we unbanning?`);
            if (!Reason) Reason = `Unbanned by ${message.author.tag}`

            message.guild.fetchBans()
            .then(bans => {
            if (bans.some(u => User.includes(u.username))) {
            let user = bans.find(user => user.username === User);

            message.guild.unban(user.id, Reason);
            }
            else if (bans.some(u => User.includes(u.id))) {

            message.guild.unban(User, Reason);
            }
            else {
            return message.reply(`This person is not banned`);
            }

            });
            }
            }
    },
    name: 'unban',
    description: 'Unbans a guild member by their ID',
    usage: '`unban <@User> [Reason]`'
}