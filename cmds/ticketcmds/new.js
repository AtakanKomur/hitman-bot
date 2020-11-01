const Discord = require("discord.js");
const config = require("../../configs/config.json");
const embed = require("../../configs/embed.json")

module.exports.run = async (bot, message, args, msg) => {


    var userName = message.author.username
    const categoryID = "729340597713895467";

    let nameOfChannel1 = "🎫-ticket-" + message.author.username.toLowerCase();
    let nameOfChannel2 = "🤝-partner-" + message.author.username.toLowerCase();
    let nameOfChannel3 = "🛒-bestellen-" + message.author.username.toLowerCase();
    let nameOfChannel4 = "📖-vragen-" + message.author.username.toLowerCase();

    // Check if channel exist
    if ((message.guild.channels.cache.find(c => c.name.toLowerCase() == nameOfChannel1)))
        return message.reply("Je hebt al een ticket open staan!")
    if ((message.guild.channels.cache.find(c => c.name.toLowerCase() == nameOfChannel2)))
        return message.reply("Je hebt al een ticket open staan!")
    if ((message.guild.channels.cache.find(c => c.name.toLowerCase() == nameOfChannel3)))
        return message.reply("Je hebt al een ticket open staan!")
    if ((message.guild.channels.cache.find(c => c.name.toLowerCase() == nameOfChannel4)))
        return message.reply("Je hebt al een ticket open staan!")
    if ((message.guild.channels.cache.find(c => c.name.toLowerCase() == nameOfChannel4)))
        return message.reply("Je hebt al een ticket open staan!") 
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

                    message.channel.send(`Je ticket is aangemaakt! ${settedParent}`).then(async (msg) => {

                        msg.delete({
                            timeout: 5000
                        });
                        message.delete({
                            timeout: 120
                        });

                    })

                    const ticketembed = new Discord.MessageEmbed()
                        .setDescription(`
🎫 | Ticket Openen

Reageer om een ticket te openen!

🤝 | Partners
🛒 | Aankopen
📖 | Vragen`)
                        .setColor(config.color)
                        .setFooter(embed.footer)

                    settedParent.send(ticketembed).then(async (msg) => {

                        var emoji = await promptMessage(msg, message.author, 30, ["🤝", "🛒", "📖"]);


                        if (emoji === "🤝") {
                            msg.delete();
                            msg.channel.setName(`🤝-partner-${message.author.username}`)
                            settedParent.send("Hallo, stuur alvast uw discord server link en vertel ons waarom wij met jou partner moeten worden.")


                        }
                        if (emoji === "🛒") {

                            msg.delete();
                            msg.channel.setName(`🛒-bestellen-${message.author.username}`)
                            settedParent.send("Wat wil je precies bestellen?")


                        }
                       
                        if (emoji == '📖') {
                            msg.delete();
                            msg.channel.setName(`📖-vragen-${message.author.username}`)
                            settedParent.send("Wat is je vraag?")


                        }
                    })
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
    name: "new",
}