import Discord from "discord.js";

export default function areTextChannels(
  channels: Discord.GuildChannel[]
): channels is Discord.TextChannel[] {
  return channels.every((channel) => channel instanceof Discord.TextChannel);
}
