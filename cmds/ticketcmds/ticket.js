const Discord = require("discord.js");
const config = require("../../configs/config.json");
const embed = require("../../configs/embed.json")

module.exports.run = async (bot, message, args, msg) => {



    var userName = message.author.username
    const categoryID = "729340597713895467";

    let nameOfChannel1 = "🎫-ticket-" + message.author.username.toLowerCase();

    if ((message.guild.channels.cache.find(c => c.name.toLowerCase() == nameOfChannel1)))
        return message.reply("You have already 1 ticket open!")
        {

            message.guild.channels.create("🎫-ticket-" + userName.toLowerCase(), {
                type: 'text'
            }).then((createdchannel) => {
                createdchannel.setParent(categoryID).then((settedParent) => {

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'), {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                    });

                    settedParent.updateOverwrite(message.author.id, {
                        CREATE_INSTANT_INVITE: false,
                        VIEW_CHANNEL: true,
                        READ_MESSAGES: true,
                        SEND_MESSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true,
                        READ_MESSAGES_HISTORY: true

                    });

                    message.channel.send(`Your ticket has been created: ${settedParent}`).then(async (msg) => {

                        msg.delete({
                            timeout: 5000
                        });
                        message.delete({
                            timeout: 120
                        });

                    })

                    var SettedParentEmbed = new Discord.MessageEmbed()
                    .setTitle("🎫 | Ticket")
                    .setFooter("Hitman © Ticket")
                    .setColor(embed.color)
                    .setDescription("Hello there! what can I help you with?")
                    .setTimestamp()

                    settedParent.send(SettedParentEmbed)

                    })
                })


            }
        

    async function promptMessage(message, author, time, reactions) {

        time *= 3000000;

        for (const reaction of reactions) {
            await message.react(reaction);
        }

        const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

        return message.awaitReactions(filter, {
            max: 1,
            time: time
        }).then(collected => collected.first() && collected.first().emoji.name);
    }
}




module.exports.help = {
    name: "ticket",
}