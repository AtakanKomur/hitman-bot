const Discord = require("discord.js");
const config = require("./configs/config.json");
const embed = require("./configs/embed.json")

const fs = require("fs")

const client = new Discord.Client();
client.commands = new Discord.Collection()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

fs.readdir("./cmds/funcmds/", (err, files) => {

  if (err) console.log(err);

  var jsFiles = files.filter(f => f.split(".").pop() === "js");

  if (jsFiles.length <= 0) {
    console.log("Fun ->        『❌』 Niks gevonden");
    return;
  }

  jsFiles.forEach((f, i) => {

    var fileGet = require(`./cmds/funcmds/${f}`);
    console.log(`Fun ->        『✅』 ${f} loaded`)

    client.commands.set(fileGet.help.name, fileGet);

  })

});

fs.readdir("./cmds/ticketcmds/", (err, files) => {

  if (err) console.log(err);

  var jsFiles = files.filter(f => f.split(".").pop() === "js");

  if (jsFiles.length <= 0) {
    console.log("Ticket -> 『❌』 Niks gevonden");
    return;
  }

  jsFiles.forEach((f, i) => {

    var fileGet = require(`./cmds/ticketcmds/${f}`);
    console.log(`Ticket ->     『✅』 ${f} loaded`)

    client.commands.set(fileGet.help.name, fileGet);

  })

});

fs.readdir("./cmds/moderationcmds/", (err, files) => {

  if (err) console.log(err);

  var jsFiles = files.filter(f => f.split(".").pop() === "js");

  if (jsFiles.length <= 0) {
    console.log("Mod ->        『❌』 Niks gevonden");
    return;
  }

  jsFiles.forEach((f, i) => {

    var fileGet = require(`./cmds/moderationcmds/${f}`);
    console.log(`Mod ->        『✅』 ${f} loaded`)

    client.commands.set(fileGet.help.name, fileGet);

  })

});

fs.readdir("./cmds/setupcmds/", (err, files) => {

  if (err) console.log(err);

  var jsFiles = files.filter(f => f.split(".").pop() === "js");

  if (jsFiles.length <= 0) {
    console.log("Setup ->        『❌』 Niks gevonden");
    return;
  }

  jsFiles.forEach((f, i) => {

    var fileGet = require(`./cmds/setupcmds/${f}`);
    console.log(`Setup ->        『✅』 ${f} loaded`)


    client.commands.set(fileGet.help.name, fileGet);

  })
});

client.on("message", async message => {

  if (message.author.bot) return;

  if (message.channel.type === "dm") return;

  var prefix = config.prefix;

  var messageArray = message.content.split(" ");

  var command = messageArray[0];

  var commands = client.commands.get(command.slice(prefix.length));

  var args = messageArray.slice(1);

  var commands = client.commands.get(command.slice(prefix.length));

  if (commands) commands.run(client, message, args);

});

client.on('message', msg => {

  if (msg.content === `<@!${client.user.id}>`) {

    var tag = new Discord.MessageEmbed()
      .setDescription(`:hand_splayed: | Hello there! my prefix is: \`${config.prefix}\``)
      .setColor(embed.color)

    msg.channel.send(tag)
  }

});

client.login(config.token)