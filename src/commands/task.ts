import Discord from "discord.js";
import { reactions } from "../config";

export = {
    name: "task",
    description: "Command Handler For Tasks On A Server",
    usage: "<commands name>",
    guildOnly: true,
    permissions: "admin",
    aliases: ["t"],
    execute: function (message: Discord.Message): void {
        message.react(reactions.good);
    },
};