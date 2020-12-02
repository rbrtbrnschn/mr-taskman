import Discord from "discord.js";

export default {
  name: "select",
  description: "selects a task",
  usage: "<taskId>",
  args: true,
  guildOnly: true,
  category: "task",
  execute: function (message: Discord.Message, args: Array<string>): void {
    console.log("2");
  },
};
