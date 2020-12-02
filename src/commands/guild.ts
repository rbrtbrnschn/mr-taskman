import Discord from "discord.js";
import Command from "../interfaces/command";
import { manager } from "../index";
import config from "../config";
import validate from "../utils/validate";

export default {
  name: "guild",
  description: "Command Handler For Servers",
  usage: "<commands name>",
  subcommand: "guild",
  guildOnly: true,
  args: true,
  aliases: ["g"],
  execute: function (message: Discord.Message): void {
    // Get Arguments
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const first = args.shift().toLowerCase();
    message.content = `${config.prefix}${args.join(" ")}`;
    // TODO throw right errors
    // Get Command
    const { commands } = manager;
    const command =
      commands.get(first) ||
      commands.find((cmd: Command) => cmd.aliases?.includes(first));
    if (!command) {
      message.reply(config.messages.command());
      return;
    }

    // Execute
    try {
      const isAllowed = validate(message, command, args);
      if (isAllowed) command.execute(message, args);
    } catch (err) {
      console.log(err);
      message.reply(config.messages.error());
    }
  },
};
