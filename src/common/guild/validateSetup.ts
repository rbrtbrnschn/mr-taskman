import Discord from "discord.js";
import { GuildInterface } from "../../database/schemas/guild";
import { validateChannelId } from "../../common/guild/validateChannelId";
import { validateRoles } from "../../common/guild/validateRoles";

function isGuildSetup(
  message: Discord.Message,
  guild: GuildInterface
): boolean {
  const isAllowed = [];
  isAllowed.push(validateChannelId(message, guild.channelId));
  isAllowed.push(validateRoles(message, guild.roles));
  if (isAllowed.some((v) => !v)) return false;
  return true;
}

export { isGuildSetup };
