import Discord from "discord.js";
import TaskService from "../../services/task";

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
    let selectedTask = undefined;
    if (!args.length) {
      // Show Selected
      selectedTask = await TaskService.fetchSelected(message);
    } else {
      // Select
      selectedTask = await TaskService.select(message, args[0]);
    }
    console.log(selectedTask);
    message.reply(TaskService.formatTaskEmbed(message, selectedTask));
    // message.reply(config.messages.todo());
  },
};
