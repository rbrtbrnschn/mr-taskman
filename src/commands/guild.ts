import Discord from "discord.js";
import { prefix } from "../config";
import onMessage from "../events/onMessage";

export = {
    name: "guild",
    description: "Command Handler For Servers",
    usage: "<commands name>",
    guildOnly: false,
    aliases: ["g"],
    execute: function (message: Discord.Message): void {
        // Get Arguments
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        message.content = `${prefix}${args.join(" ")}`;
        onMessage(message);
    },
};