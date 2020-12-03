import Discord from "discord.js";
import TaskService from "../../services/task";
import config from "../../config";

export = {
  name: "wip",
  description: "sets task status to in progress",
  usage: "",
  args: false,
  guildOnly: true,
  category: "task",
  execute: async function (
    message: Discord.Message,
    args: Array<string>
  ): Promise<void> {
    let selectedTask = undefined;
    selectedTask = await TaskService.fetchSelected(message);
    if (!selectedTask) {
      message.reply(config.messages.taskSelected());
      return;
    }
    TaskService.wip(message, selectedTask);

    try {
      await message.channel.fetch();
      // TODO *1
      // DO NOT LOOK IN CURRENT, GET CHANNEL ID, TASK WAS SAVED
      // IN AND LOOK IN THERE
      const taskMessage = message.channel.messages.cache.get(
        selectedTask.messageId
      );

      // Wrong Channel
      // TODO FIX *1
      if (!taskMessage) {
        message.reply(config.messages.taskSelected());
        return;
      }
      // Unknown Error
      // Happens
      if (!taskMessage.embeds.length) {
        message.reply(config.messages.error());
        return;
      }

      const embed = taskMessage.embeds[0];
      embed.setColor(config.taskColors.wip);
      taskMessage.edit(embed);
    } catch (err) {
      console.log("wrong channel");
      console.log(err);
      message.react(config.reactions.error());
    }
  },
};
