import Discord from "discord.js";
import { messages } from "../../config";
export = {
    name: "create",
    description: "creates task",
    usage: "<title>",
    args: true,
    guildOnly: true,
    category: "task",
    execute: function (message: Discord.Message, args: Array<string>): void {
        message.reply(messages.todo());
    }
};