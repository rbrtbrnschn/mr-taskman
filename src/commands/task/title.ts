import Discord from "discord.js";
import TaskService from "../../services/task";
// import GuildService from "../../services/guild";
import config from "../../config";

export = {
  name: "title",
  description: "sets title",
  usage: "<title>",
  args: true,
  guildOnly: true,
  category: "task",
  execute: async function (
    message: Discord.Message,
    args: Array<string>
  ): Promise<void> {
    const selectedTask = await TaskService.fetchSelected(message);
    if (!args.length) {
      message.reply(config.messages.args());
      return;
    }
    if (!selectedTask) {
      message.reply(config.messages.taskSelected());
      return;
    }

    TaskService.editTitle(message, selectedTask, args.join(" "));

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
      // TODO Not sure if giving in args.join(" ") is best idea
      // TODO maybe await TaskService.editTitle() and then use taskSelect
      embed.setTitle(args.join(" "));
      taskMessage.edit(embed);
    } catch (err) {
      console.log("wrong channel");
      console.log(err);
      message.react(config.reactions.error());
    }
  },
};
