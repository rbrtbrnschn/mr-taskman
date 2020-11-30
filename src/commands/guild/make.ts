import Discord from "discord.js";

import { createGuild } from "../../common/guild/create";
import { getGuild } from "../../common/guild/get";

export = {
  name: "make",
  description: "creates a guild in the database",
  usage: "",
  args: false,
  guildOnly: false,
  category: "guild",
  execute: async function (
    message: Discord.Message,
    args: Array<string>
  ): Promise<Discord.Message> {
    const isOwner = message.author.id === message.guild.ownerID;
    if (!isOwner) {
      return message.reply(
        "Ha ha ha ha ha ha ha ha ha ha. You have no power here"
      );
    }
    const hasGuildAlready = await getGuild(message);
    if (hasGuildAlready) {
      return message.reply(
        "I seem to be experiencing deja vu, because i remember performing this action already"
      );
    }

    await createGuild(message);
  },
};
