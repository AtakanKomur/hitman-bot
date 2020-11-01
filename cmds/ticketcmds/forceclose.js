const Discord = require("discord.js");
const config = require("../../configs/config.json");
const embed = require("../../configs/embed.json")

module.exports.run = async (bot, message, args) => {



    var close1 = new Discord.MessageEmbed()
        .setTitle("❌ | Alleen mensen met `MANAGE_MESSAGES` mogen tickets verwijderen!")
        .setColor(embed.color);

    var close2 = new Discord.MessageEmbed()
        .setTitle("❌ | Je kan deze commando alleen in een ticket gebruiken!")
        .setColor(embed.color)

    const categoryID = "729340597713895467";

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(close1);

    if (message.channel.parentID == categoryID) {
        message.channel.delete();
    } else {
        message.channel.send(close2)
    }

}
module.exports.help = {
    name: "forceclose",
}