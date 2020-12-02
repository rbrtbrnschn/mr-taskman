import Discord from "discord.js";
import { manager } from "../index";
import config from "../config";

const { bot, colors, prefix, reactions } = config;

export default {
  name: "help",
  description: "List's Commands & Helpful Information",
  usage: "<command name>",
  guildOnly: false,
  cooldown: 5,
  aliases: ["welp"],
  execute: function (message: Discord.Message, args: Array<string>): void {
    const isSpecific =
      args.length && isNaN(parseInt(args.join(""))) ? true : false;
    const perPage = 5;
    const page = !isNaN(parseInt(args[0], 10)) ? parseInt(args[0]) : 1;

    // List General Information
    const embed = new Discord.MessageEmbed();
    embed.setFooter(`${bot.name} ~ V${bot.version}`);
    embed.setColor(colors.primary);

    // General Help
    if (!isSpecific) {
      embed.setTitle("List of available commands");
      embed.setAuthor(`${prefix}${this.name}`);

      // Add Commands
      manager.commands.forEach((cmd) => {
        const { name, description } = cmd;
        if (cmd.category && cmd.category.length) return;
        embed.addField(`> ${name}`, description);
      });

      const start = page * perPage - perPage;
      const end =
        page * perPage <= embed.fields.length
          ? page * perPage
          : embed.fields.length;
      const totalPages = Math.floor(embed.fields.length / perPage) + 1;

      embed.fields = [...embed.fields.slice(start, end)];
      embed.setFooter(
        `${bot.name} ~ V${bot.version} ~ Page ${page}/${totalPages}`
      );
    }
    // Command Specific Information
    else {
      // TODO CHECK FOR SUBCOMMANDS
      const cmd = manager.commands.get(args[0]);
      if (!cmd) {
        message.react(reactions.error());
        return;
      }

      embed.setTitle(`${cmd.name}-specific information`);
      embed.setAuthor(`${prefix}${cmd.name}`);
      embed.setColor(colors.secondary);

      if (cmd.subcommand && cmd.subcommand.length) {
        embed.setColor(colors.primary);
        const subcmds = manager.commands.filter(
          (subcmd) => subcmd.category === cmd.subcommand
        );
        embed.addField("> Subcommands:", "\u200b");
        subcmds.forEach((subcmd): void => {
          const { name, description, usage } = subcmd;
          embed.addField(
            `> ${prefix}${cmd.subcommand} ${name}`,
            `**Description**: ${description}\n**Usage**: ${prefix}${cmd.subcommand} ${subcmd.name} ${usage}`
          );
        });
      } else {
        // Remove Default & Execute
        const entries = Object.entries(cmd);
        entries.splice(entries.length - 2, 2);

        entries.forEach((e): void => {
          const key = e[0];
          let value = e[1];

          if (key === "usage") value = `${prefix}${cmd.name} ${value}`;

          embed.addField(`> ${key}`, value);
        });
      }
    }
    // Send
    message.author.send(embed);
  },
};
