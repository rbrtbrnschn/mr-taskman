import Discord from "discord.js";
// import GuildService from "../../services/guild";
// import TaskService from "../../services/task";
import config from "../../config";

export = {
  name: "select",
  description: "selects a task",
  usage: "<taskId>",
  args: false,
  guildOnly: true,
  category: "task",
  execute: async function (
    message: Discord.Message,
    args: Array<string>
  ): Promise<void> {
    if (!this.args) {
      // Show Selected
    } else {
      // Select
    }
    message.reply(config.messages.todo());
    // const foundGuild = await GuildService.fetch(message);
    // const selectedTask = TaskService.getSelectedTask(message, foundGuild);
    // console.log(selectedTask);
  },
};
