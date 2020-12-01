import Discord from "discord.js";

function validateChannelIds(
  message: Discord.Message,
  channelIds: string[]
): boolean {
  const channels = channelIds.map((id) => message.guild.channels.cache.get(id));
  if (channels.length !== channelIds.length) return false;
  return true;
}

export { validateChannelIds };
