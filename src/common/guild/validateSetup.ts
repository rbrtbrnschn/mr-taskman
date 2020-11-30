import Discord from "discord.js";
import { GuildInterface } from "../../database/schemas/guild";
import { validateChannelIds } from "../../common/guild/validateChannelId";
import { validateRoles } from "../../common/guild/validateRoles";

function isGuildSetup(
  message: Discord.Message,
  guild: GuildInterface
): boolean {
  const isAllowed = [];
  isAllowed.push(validateChannelIds(message, guild.channelIds));
  isAllowed.push(validateRoles(message, guild.roles));

  if (isAllowed.some((v) => !v)) return false;
  return true;
}

export { isGuildSetup };
