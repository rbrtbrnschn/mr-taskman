import Discord from "discord.js";

export = {
    name: "create",
    description: "creates task",
    usage: "<title>",
    args: true,
    guildOnly: true,
    category: "task",
    execute: function (message: Discord.Message, args: Array<string>): void {
        console.log("hi");
    }
};