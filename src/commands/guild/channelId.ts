import Discord from "discord.js";
import { messages } from "../../config";
import { getGuild } from "../../common/guild/get";

export = {
    name: "channel",
    description: "set channelId",
    usage: "<#channel mention>",
    args: true,
    guildOnly: false,
    category: "guild",
    execute: async function (message: Discord.Message, args: Array<string>): Promise<Discord.Message> {
        const isOwner = message.guild.ownerID === message.author.id;
        const mention = message.mentions.channels.first();

        // Validate Permissions, arguments
        if (!isOwner) return message.reply(messages.permission());
        if (!mention) return message.reply(messages.args());
        else {
            const foundGuild = await getGuild(message);

            if (!foundGuild) return message.reply("For whatever reason, your admin fucked up big time.");
            else {
                // Edit And Save Guild
                foundGuild.channelId = mention.id;
                foundGuild.markModified("channelId");
                foundGuild.save();
                return message.reply(`Set Channel Id To <#${mention.id}>`);
            }
        }
    }
};