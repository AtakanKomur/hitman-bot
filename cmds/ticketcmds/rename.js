const Discord = require("discord.js");
const config = require("../../configs/config.json");
const embed = require("../../configs/embed.json")

module.exports.run = async (bot, message, args) => {

    var rename1 = new Discord.MessageEmbed()
        .setTitle("Wat moet de nieuwe naam zijn?")
        .setColor(embed.color);

    var rename2 = new Discord.MessageEmbed()
        .setTitle(`Ticket naam is succesvol aangepast naar ${args[0]}!`)
        .setColor(embed.color);

    if (!args[0]) {

        message.channel.send(rename1)

    } else {
        message.channel.setName(args[0]);
        message.channel.send(rename2)
    }
}
module.exports.help = {
    name: "rename",
}