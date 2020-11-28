import Discord from "discord.js";
// import { bot } from "../config";

function setPresence(message: Discord.Message): void {
    const timeoutTimer = 10000; // bot.activityTimeout || 10000
    message.client.user.setActivity("chat", { type: "WATCHING" });
    setTimeout(reset, timeoutTimer);

    // Helper
    function reset(): void {
        message.client.user.setActivity("/help", { type: "LISTENING" });
    }
}

export = setPresence;