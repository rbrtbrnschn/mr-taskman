import Discord from "discord.js";
import Guild from "../../interfaces/Guild";
import GuildModel from "../../database/schemas/guild";

async function createGuild(message: Discord.Message): Promise<void> {
  // todo
  const guild = new Guild(message);
  guild.guildId = message.guild.id;
  try {
    const guildModel = await new GuildModel({ ...guild });

    await guildModel.save();
    message.reply("Created a guild in db");
  } catch (error) {
    message.reply("Something went wrong creating a guild in db");
  }
}

export { createGuild };
