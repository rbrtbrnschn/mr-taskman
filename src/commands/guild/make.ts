import Discord from "discord.js";

import GuildService from "../../services/guild";

export default {
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
    const hasGuildAlready = await GuildService.fetch(message);
    if (hasGuildAlready) {
      return message.reply(
        "I seem to be experiencing deja vu, because i remember performing this action already"
      );
    }

    try {
      await GuildService.create(message);
      message.reply("Created a guild in db.");
    } catch (err) {
      message.reply("Something went wrong creating a guild in db.");
    }
  },
};
