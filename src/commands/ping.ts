import Discord from "discord.js";
import { manager } from "../index";
import config from "../config";

const { prefix, bot, colors } = config;

export = {
  name: "ping",
  description: "get networks stats",
  usage: "",
  args: false,
  guildOnly: false,
  execute: function (message: Discord.Message, args: Array<string>): void {
    message
      .reply(
        new Discord.MessageEmbed({
          author: { name: "Contacting my friend - Mr. Postman" },
          color: colors.secondary,
        })
      )
      .then((msg) => {
        const latency = msg.createdTimestamp - message.createdTimestamp;

        const embed = new Discord.MessageEmbed()
          .setAuthor(`${prefix}ping`)
          .setColor(colors.primary)
          .addField("**Bot Latency**:", `${latency} ms`)
          .addField("**Ping**:", `${manager.client.ws.ping} ms`)
          .setFooter(`Mr.Postman ~ V${bot.version}`);
        msg.edit(embed);
      });
  },
};
