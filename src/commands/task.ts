import Discord from "discord.js";
import Command from "../interfaces/command";
import { manager } from "../index";
import config from "../config";
import validate from "../utils/validate";
import GuildService from "../services/guild";

const { messages, prefix } = config;

export default {
  name: "task",
  description: "Command Handler For Tasks On A Server",
  usage: "<commands name>",
  guildOnly: true,
  subcommand: "task",
  aliases: ["t"],
  cooldown: 3,
  execute: async function (message: Discord.Message): Promise<Discord.Message> {
    // Validate Guild Is Setup Properly
    const foundGuild = await GuildService.fetch(message.guild);
    if (!foundGuild) return message.reply(messages.missingGuild());

    const isGuildSetupProperly = GuildService.isGuildSetup(message, foundGuild);
    if (!isGuildSetupProperly) return message.reply(messages.guildNotSetup());

    // Get Arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const first = args.shift().toLowerCase();
    message.content = `${prefix}${args.join(" ")}`;

    // Get Command
    const { commands } = manager;
    const command =
      commands.get(first) ||
      commands.find((cmd: Command) => cmd.aliases?.includes(first));
    if (!command) return message.reply(messages.command());

    // Execute
    try {
      const isAllowed = validate(message, command, args);
      if (isAllowed) command.execute(message, args);
    } catch (err) {
      console.log(err);
      message.reply(messages.error());
      message.react(config.reactions.error());
    }
  },
};
