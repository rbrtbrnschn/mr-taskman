import Discord from "discord.js";
import Command from "../interfaces/command";
import { manager } from "../index";
import config from "../config";

function validate(
  message: Discord.Message,
  command: Command,
  argsArray: Array<string>,
  { blacklist = [] }: Record<string, string[]> = {}
): boolean {
  const { args, guildOnly, permissions } = command;

  // Cooldowns
  if (!blacklist.includes("cooldown")) {
    const { cooldowns } = manager;
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = !config.bot.isProd
      ? 0
      : (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        const embed = config.messages.cooldown();
        embed.addField("> Cooldown:", timeLeft.toFixed(2));
        message.reply(embed);
        return;
      }
    }
    timestamps.set(message.author.id, now);
  }

  // Validate Given Args, Channel Type & Permission
  let replyMessage: Discord.MessageEmbed = new Discord.MessageEmbed();
  if (args && !argsArray.length) replyMessage = config.messages.args();
  else if (guildOnly && message.channel.type === "dm")
    replyMessage = config.messages.channel();
  else if (permissions) {
    const usersHighest = message.guild.members.cache.get(message.author.id)
      .roles.highest;
    const neededRole = message.guild.roles.cache.find(
      (r) => r.name === permissions
    );
    if (usersHighest.position < neededRole.position)
      replyMessage = config.messages.permission();
  }

  if (replyMessage.fields.length) {
    message.channel.send(replyMessage);
    return false;
  }
  return true;
}

export = validate;
