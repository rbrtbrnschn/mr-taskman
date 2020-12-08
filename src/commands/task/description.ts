import Discord from "discord.js";
import TaskService from "../../services/task";
// import GuildService from "../../services/guild";
import config from "../../config";
import areTextChannels from "../../utils/areTextChannels";

export = {
  name: "desc",
  description: "sets description",
  usage: "<description>",
  args: true,
  guildOnly: true,
  category: "task",
  aliases: ["description"],
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

    TaskService.editDescription(message, selectedTask, args.join(" "));

    try {
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

      // await message.channel.fetch();
      // TODO *1
      // DO NOT LOOK IN CURRENT, GET CHANNEL ID, TASK WAS SAVED
      // IN AND LOOK IN THERE
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

      // const embed = taskMessage.embeds[0];
      // TODO Not sure if giving in args.join(" ") is best idea
      // TODO maybe await TaskService.editTitle() and then use taskSelect
      taskMessages.forEach((taskMessage) => {
        const embed = taskMessage.embeds[0];

        const fieldIndex = embed.fields.findIndex(
          (v, i) => v.name === "> Description:"
        );
        embed.fields[fieldIndex].value = args.join(" ");
        taskMessage.edit(embed);
      });
    } catch (err) {
      console.log("wrong channel");
      console.log(err);
      message.react(config.reactions.error());
    }
  },
};
