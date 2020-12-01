import Discord from "discord.js";
import GuildModel from "../../database/schemas/guild";

async function createGuild(message: Discord.Message): Promise<void> {
  // todo
  try {
    const guildModel = await new GuildModel({
      guildId: message.guild.id,
      ownerId: message.guild.ownerID,
      roles: Array.from(message.guild.roles.cache.values()).reduce(
        (prev, curr) => {
          return { ...prev, [curr.name]: curr.id };
        },
        {}
      ),
      tasks: [],
      channelIds: [],
    });

    await guildModel.save();
    message.reply("Created a guild in db");
  } catch (error) {
    message.reply("Something went wrong creating a guild in db");
  }
}

export { createGuild };
