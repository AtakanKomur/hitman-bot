const Discord = require("discord.js");
const config = require("../../configs/config.json");
const embed = require("../../configs/embed.json");

module.exports.run = async (bot, message, args) => {

   var user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);

   var remove1 = new Discord.MessageEmbed()
   .setTitle("Wie wil je verwijderen uit de ticket?")
   .setColor(embed.color);

   var remove2 = new Discord.MessageEmbed()
   .setTitle(`${user} verwijderd uit ticket!`)
   .setColor(embed.color);


   if(!user) return message.channel.send(remove1)

   message.channel.updateOverwrite(user.id, {
    VIEW_CHANNEL: false
   })

   message.channel.send(remove2);
}

module.exports.help = {
    name: "removemember",
}