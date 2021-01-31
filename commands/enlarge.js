const { parse } = require("twemoji-parser");
const Discord = require("discord.js");
module.exports = {
    name: 'enlarge',
    aliases: ['en', 'enlarge', 'emoji'],
    description: "Enlarges an emoji",
    usage: `<emoji>`,
    cooldown: 3,
    execute(client, message, args ){
    const emoji = args[0]
    if (!emoji) return message.channel.send("No emoji provided!");
    let custom = Discord.Util.parseEmoji(emoji);
    const embed = new Discord.MessageEmbed()
    .setTitle(`Enlarged ${emoji}`)
    .setURL('https://grandpajeff.netlify.app/')
    .setColor("#FF0000");

    if (custom.id) {
        embed.setImage(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`,{format: 'png', dynamic: 'true', size: 2048 });
        return message.channel.send(embed);
    }
    else {
        let parsed = parse(emoji, { assetType: "png" });
        if (!parsed[0]) return message.channel.send("Invalid emoji!");

        embed.setImage(parsed[0].url);
        return message.channel.send(embed);
    }
    }

}