import Discord from "discord.js";

function validateChannelId(message: Discord.Message, channelId: string): boolean {
    const channel = message.guild.channels.cache.get(channelId);
    if (!channel) return false;
    return true;
}

export { validateChannelId };