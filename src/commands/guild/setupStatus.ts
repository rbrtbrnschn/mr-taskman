import Discord from "discord.js";
import config from "../../config";

import GuildService from "../../services/guild";

const { messages, prefix } = config;
export = {
  name: "status",
  description: "list's further requirements to setup server properly",
  usage: "",
  args: false,
  guildOnly: true,
  category: "guild",
  execute: async function (
    message: Discord.Message,
    args: Array<string>
  ): Promise<Discord.Message> {
    const isOwner = message.author.id === message.guild.ownerID;

    if (!isOwner) return message.reply(messages.permission());
    else {
      const foundGuild = await GuildService.fetch(message);

      if (!foundGuild) return message.reply(config.messages.missingGuild());
      else {
        const embed = new Discord.MessageEmbed();
        embed.setAuthor(config.errorCodes.guildNotSetup.code);

        const hasRoles = GuildService.validateRoles(message, foundGuild.roles);
        const hasChannelId = GuildService.validateChannelIds(
          message,
          foundGuild.channelIds
        );

        if (!hasRoles) {
          embed.setTitle(`Setup roles via \`${prefix}guild role\`.\n`);
        } else if (!hasChannelId) {
          embed.setTitle(
            `Setup channel id for task messages to show in via \`${prefix}guild channel <#channel mention>\`.\n`
          );
        } else {
          embed.setTitle(
            `All set. For more information on tasks, please refer to \`${prefix}help task\``
          );
          return message.reply(embed);
        }
        embed.addField(
          `For more help on this subject, please refer to \`${prefix}help guild\``,
          "\u200b"
        );
        embed.setFooter(
          `Do ${config.prefix}error ${config.errorCodes.guildNotSetup.code} for more information.`
        );

        return message.reply(embed);
      }
    }
  },
};
