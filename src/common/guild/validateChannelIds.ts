import Discord from "discord.js";

function validateChannelIds(
  message: Discord.Message,
  channelIds: string[]
): boolean {
  const channels = channelIds.map((id) => message.guild.channels.cache.get(id));
  const hasAllChannels = channels.every(
    (c) => c instanceof Discord.GuildChannel
  );
  return hasAllChannels;
}

export { validateChannelIds };
