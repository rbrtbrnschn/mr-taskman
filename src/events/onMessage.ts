import { Message } from "discord.js";

export default function (message: Message): void {
    if (message.content === "ping") {
        message.reply("Pong!");
    }
}