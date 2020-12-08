import Discord from "discord.js";
import TaskService from "../../services/task";
import config from "../../config";
import areTextChannels from "../../utils/areTextChannels";
import { TaskInterface } from "../../models/task";

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
    let selectedTask: TaskInterface = undefined;
    selectedTask = await TaskService.fetchSelected(message);
    if (!selectedTask) {
      message.reply(config.messages.taskSelected());
      return;
    }

    TaskService.complete(message, selectedTask);
    TaskService.deselect(message);

    try {
      // await message.channel.fetch();
      // TODO *1
      // DO NOT LOOK IN CURRENT, GET CHANNEL ID, TASK WAS SAVED
      // IN AND LOOK IN THERE
      const taskChannels = Array.from(
        selectedTask.messageIds
      ).map(([taskChannelId]) =>
        message.guild.channels.cache.get(taskChannelId)
      );

      if (!areTextChannels(taskChannels)) return;

      const fetchedMessages = taskChannels.map((channel) =>
        channel.messages
          .fetch()
          .then((messageCollection) =>
            messageCollection.get(selectedTask.messageIds.get(channel.id))
          )
      );

      const taskMessages = await Promise.all(fetchedMessages);
      const embedsAmount = taskMessages.map((msg) => msg.embeds[0]).length;

      // const taskMessage = message.channel.messages.cache.get(
      //   selectedTask.messageId
      // );

      // Wrong Channel
      // TODO FIX *1
      if (!taskMessages.length) {
        message.reply(config.messages.taskSelected());
        return;
      }
      // Unknown Error
      // Happens
      if (embedsAmount < 1) {
        message.reply(config.messages.error());
        return;
      }

      taskMessages.forEach((taskMessage) => {
        const embed = taskMessage.embeds[0];
        embed.setColor(config.taskColors.completed);
        taskMessage.edit(embed);
      });
    } catch (err) {
      console.log("wrong channel");
      console.log(err);
      message.react(config.reactions.error());
    }
  },
};
