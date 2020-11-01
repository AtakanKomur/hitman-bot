const Discord = require("discord.js");
const config = require("../../configs/config.json");
const embed = require("../../configs/embed.json")

module.exports.run = async(bot, message, args) => {

    var close2 = new Discord.MessageEmbed()
        .setDescription("❌ | Je kan deze commando alleen in een ticket gebruiken!")
        .setColor(config.color)

    const categoryID = "729340597713895467";

    if (message.channel.parentID == categoryID) {
        message.channel.updateOverwrite(message.author.id, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false
        })

        message.channel.setName(`Ticket-gesloten`);
        message.channel.setName(`Ticket-gesloten`);
        var close1 = new Discord.MessageEmbed()
        .setDescription("✅ | Ticket is succesvol gesloten!")
        .setFooter("/forceclose om de ticket helemaal ter verwijderen")
        .setColor(embed.color)
        message.channel.send(close1)
    } else {
        message.channel.send(close2)
    }   
    }


module.exports.help = {
    name: "close",
}