import Discord from "discord.js";
import { messages } from "../../config";
export = {
  name: "complete",
  description: "complete task",
  usage: "",
  args: false,
  guildOnly: true,
  category: "task",
  execute: function (message: Discord.Message, args: Array<string>): void {
    message.reply(messages.todo());
  },
};
