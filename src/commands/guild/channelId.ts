import Discord from "discord.js";

export = {
    name: "channel",
    description: "set channelId",
    usage: "<id>",
    args: true,
    guildOnly: false,
    category: "guild",
    execute: function (message: Discord.Message, args: Array<string>): void {
        console.log("guild channel", args[0]);
    }
};