import Discord from "discord.js";
// import config from "../config";

function setPresence(message: Discord.Message): void {
  const timeoutTimer = 5000; // bot.activityTimeout || 10000
  message.client.user.setActivity("chat", { type: "WATCHING" });
  setTimeout(reset, timeoutTimer);

  // Helper
  function reset(): void {
    message.client.user.setActivity("/help", { type: "LISTENING" });
  }
}

export = setPresence;
