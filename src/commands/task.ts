import Discord from "discord.js";
import { reactions, prefix } from "../config";
import onMessage from "../events/onMessage";

export = {
    name: "task",
    description: "Command Handler For Tasks On A Server",
    usage: "<commands name>",
    guildOnly: true,
    subcommand: "task",
    aliases: ["t"],
    execute: function (message: Discord.Message): void {
        // TODO Do not reroute through onMessage due to cooldowns
        // Get Arguments
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        message.content = `${prefix}${args.join(" ")}`;
        onMessage(message);
    },
};