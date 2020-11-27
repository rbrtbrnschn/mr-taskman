import { Message } from "discord.js";
import { manager } from "../index";
import { prefix, reactions, messages } from "../config";
import validate from "../common/validate";
import Command from "../interfaces/command";

export default function (message: Message): void {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    // Get Arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const first = args.shift().toLowerCase();

    // Get Command
    const { commands } = manager;
    const command = commands.get(first) || commands.find((cmd: Command) => cmd.aliases?.includes(first));
    if (!command) { message.reply(messages.command()); return; }

    // Execute
    try {
        const isAllowed = validate(message, command, args);
        if (isAllowed) command.execute(message, args);
    }
    catch (err) {
        console.log(err);
        message.reply(messages.error());
    }
}