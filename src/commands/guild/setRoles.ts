import Discord from "discord.js";
import { getGuild } from "../../common/guild/get";
import { messages } from "../../config";

export = {
    name: "role",
    description: "set role for permissions",
    usage: "<admin || moderator> <@role mention>",
    args: true,
    guildOnly: true,
    category: "guild",
    execute: async function (message: Discord.Message, args: Array<string>): Promise<Discord.Message> {
        const roles = ["admin", "moderator"];
        const role = args[0];
        const isOwner = message.author.id === message.guild.ownerID;
        const mention = message.mentions.roles.first();
        debugger
        // Validate Permissions, arguments
        if (!isOwner) return message.reply(messages.permission());
        if (!roles.includes(role)) return message.reply("Allowed Roles: `admin` and `moderator`");
        if (!mention) return message.reply(messages.args());
        else {
            const foundGuild = await getGuild(message);

            if (!foundGuild) return message.reply("For whatever reason, you're admin fucked up big time.");
            else {
                // Edit And Save Guild
                foundGuild.roles[role] = mention.id;
                foundGuild.markModified("roles");
                foundGuild.save();
                return message.reply(`Set ${role} to ${mention}`);
            }

        }
    }
};