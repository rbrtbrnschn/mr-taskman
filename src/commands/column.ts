import Discord from "discord.js";
import config from "../config";
import Command from "../interfaces/command";
import validate from "../utils/validate";
import { manager } from "../index";

export default {
  name: "column",
  description: "column handler",
  usage: "<amount of messages>",
  args: false,
  guildOnly: true,
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
