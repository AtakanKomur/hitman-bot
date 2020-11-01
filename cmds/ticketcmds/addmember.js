const Discord = require("discord.js");
const config = require("../../configs/config.json");
const embed = require("../../configs/embed.json");

module.exports.run = async (bot, message, args) => {

   var user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);

   var add1 = new Discord.MessageEmbed()
   .setTitle("Wie wil je toevoegen aan de ticket?")
   .setColor(embed.color);

   if(!user) return message.channel.send(add1)

   message.channel.updateOverwrite(user.id, {
    SEND_MESSAGES: true,
    VIEW_CHANNEL: true,
    CONNECT: true,
    READ_MESSAGES_HISTORY: true,
    READ_MESSAGES: true
   })

   var add2 = new Discord.MessageEmbed()
   .setTitle(`${user} toegevoegt aan ticket!`)
   .setColor(embed.color);

   message.channel.send(add2);
   message.channel.send(`${user}`)
}

module.exports.help = {
    name: "addmember",
}