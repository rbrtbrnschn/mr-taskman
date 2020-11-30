import Discord from "discord.js";
import { messages } from "../../config";
import { getGuild } from "../../common/guild/get";

export = {
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
    const mentions = Array.from(message.mentions.channels.values());
    // const mention = message.mentions.channels.first()

    // Validate Permissions, arguments
    if (!isOwner) return message.reply(messages.permission());
    if (mentions.length < 1) return message.reply(messages.args());
    else {
      const foundGuild = await getGuild(message);

      if (!foundGuild)
        return message.reply(
          "For whatever reason, your admin fucked up big time."
        );
      else {
        // Edit And Save Guild
        foundGuild.channelIds = mentions.map((c) => c.id);
        foundGuild.markModified("channelIds");
        foundGuild.save();
        return message.reply(
          (mentions.length === 1 && `Set Channel Id To <#${mentions[0].id}>`) ||
            (mentions.length > 1 &&
              `Set Channel Ids To ${mentions
                .map((m) => `<#${m.id}>`)
                .join(", ")}`)
        );
      }
    }
  },
};
