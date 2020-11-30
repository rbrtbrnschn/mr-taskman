import Discord from "discord.js";
import { GuildModel } from "../../database/schemas";
import { GuildInterface } from "../../database/schemas/guild";

async function getGuild(message: Discord.Message): Promise<GuildInterface> {
  const foundGuild = await GuildModel.findOne({ guildId: message.guild.id });

  if (!foundGuild) return;
  else return foundGuild;
}

export { getGuild };
