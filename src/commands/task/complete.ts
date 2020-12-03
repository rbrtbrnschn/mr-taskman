import Discord from "discord.js";
import TaskService from "../../services/task";
import config from "../../config";
export = {
  name: "complete",
  description: "complete task",
  usage: "",
  args: false,
  guildOnly: true,
  category: "task",
  execute: async function (
    message: Discord.Message,
    args: Array<string>
  ): Promise<void> {
    // message.reply(config.messages.todo());
    let selectedTask = undefined;
    // const foundGuild = await GuildService.fetch(message);
    selectedTask = await TaskService.fetchSelected(message);
    if (!selectedTask) {
      message.reply(config.messages.taskSelected());
      return;
    }

    TaskService.complete(message, selectedTask);

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
      embed.setColor(config.taskColors.completed);
      taskMessage.edit(embed);
    } catch (err) {
      console.log("wrong channel");
      console.log(err);
      message.react(config.reactions.error());
    }
  },
};
