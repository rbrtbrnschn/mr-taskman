import Discord from "discord.js";
import config from "../../config";
import GuildService from "../../services/guild";
const { messages } = config;

export default {
  name: "channel",
  description: "set channelId",
  usage: "<#channel mention>",
  args: true,
  guildOnly: false,
  category: "guild",
  execute: async function (
    message: Discord.Message,
    args: Array<string>
  ): Promise<Discord.Message> {
    const isOwner = message.guild.ownerID === message.author.id;
    // const mention = message.mentions.channels.first();
    const mentions = Array.from(message.mentions.channels.values());

    // Validate Permissions, arguments
    if (!isOwner) return message.reply(messages.permission());
    if (mentions.length < 1) return message.reply(messages.args());
    else {
      const foundGuild = await GuildService.fetch(message);

      if (!foundGuild)
        return message.reply(
          "For whatever reason, your admin fucked up big time."
        );
      else {
        // Edit And Save Guild
        foundGuild.channelIds = mentions.map((mention) => mention.id);
        foundGuild.markModified("channelIds");
        foundGuild.save();
        return message.reply(
          `Set Channel Id To ${mentions
            .map((mention) => `<#${mention.id}>`)
            .join(", ")}`
        );
      }
    }
  },
};
