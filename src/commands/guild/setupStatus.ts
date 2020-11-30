import Discord from "discord.js";
import { getGuild } from "../../common/guild/get";
import { validateChannelId } from "../../common/guild/validateChannelId";
import { validateRoles } from "../../common/guild/validateRoles";
import { messages, prefix } from "../../config";
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
      const foundGuild = await getGuild(message);

      if (!foundGuild)
        return message.reply(
          "For whatever reason, you're admin fucked up big time."
        );
      else {
        let replyMessage = "";
        const hasRoles = validateRoles(message, foundGuild.roles);
        const hasChannelId = validateChannelId(message, foundGuild.channelId);

        if (!hasRoles)
          replyMessage += `Setup roles via \`${prefix}guild role\`.\n`;
        else if (!hasChannelId)
          replyMessage += `Setup channel id for task messages to show in via \`${prefix}guild channel\`.\n`;
        else
          return message.reply(
            `All set. For more information on tasks, please refer to \`${prefix}help task\``
          );
        replyMessage += `For more help on this subject, please refert to \`${prefix}help guild\``;

        return message.reply(replyMessage);
      }
    }
  },
};
