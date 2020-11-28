import Discord from "discord.js";
import { messages } from "../config";
export = {
    name: "error",
    description: "shows error message for given error code",
    usage: "<error code>",
    args: true,
    guildOnly: false,
    execute: function (message: Discord.Message, args: Array<string>): void {
        const errorCode = args[0];

    }
};