import Discord from "discord.js";
import Command from "../interfaces/command";
import { manager } from "../index";
import { messages, prefix } from "../config";
import validate from "../common/validate";

export = {
  name: "task",
  description: "Command Handler For Tasks On A Server",
  usage: "<commands name>",
  guildOnly: true,
  subcommand: "task",
  aliases: ["t"],
  cooldown: 3,
  execute: function (message: Discord.Message): void {
    // Get Arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const first = args.shift().toLowerCase();
    message.content = `${prefix}${args.join(" ")}`;

    // Get Command
    const { commands } = manager;
    const command =
      commands.get(first) ||
      commands.find((cmd: Command) => cmd.aliases?.includes(first));
    if (!command) {
      message.reply(messages.command());
      return;
    }

    // Execute
    try {
      const isAllowed = validate(message, command, args);
      if (isAllowed) command.execute(message, args);
    } catch (err) {
      console.log(err);
      message.reply(messages.error());
    }
  },
};
