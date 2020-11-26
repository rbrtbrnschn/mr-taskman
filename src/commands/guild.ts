import Discord from "discord.js";
import { reactions } from "../config";

export = {
    name: "guild",
    description: "Command Handler For Servers",
    usage: "<commands name>",
    guildOnly: false,
    aliases: ["g"],
    execute: function (message: Discord.Message): void {
        message.react(reactions.good);
    },
};