import Discord from "discord.js";
import TaskService from "../../services/task";
import config from "../../config";
import areTextChannels from "../../utils/areTextChannels";

export = {
  name: "remove",
  description: "adds participants",
  usage: "<@mentioned user>",
  args: true,
  guildOnly: true,
  category: "task",
  aliases: ["kick"],
  execute: async function (
    message: Discord.Message,
    args: Array<string>
  ): Promise<void> {
    if (!args.length) {
      message.reply(config.messages.args());
      return;
    }
    const mention = message.mentions.members.first();
    if (!mention) {
      message.reply(config.messages.args());
      return;
    }

    const selectedTask = await TaskService.fetchSelected(message);
    const hasParticpant = selectedTask.participants.includes(mention.id);
    if (!hasParticpant) {
      message.reply(config.messages.error()); // TODO give back config.messages.hasParticipant()
      return;
    }
    TaskService.removeParticipant(selectedTask, mention.id);

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
        // TODO Not sure if giving in args.join(" ") is best idea
        // TODO maybe await TaskService.editTitle() and then use taskSelect
        const fieldIndex = embed.fields.findIndex(
          (v, i) => v.name === "> Participants:"
        );
        const participantString = selectedTask.participants
          .filter((id) => id !== mention.id)
          .map((id) => `<@${id}>`)
          .join(",");
        embed.fields[fieldIndex].value = participantString || "\u200b";
        taskMessage.edit(embed);
      });

      const noOtherParticipants = selectedTask.participants.length === 0;
      if (noOtherParticipants) return;

      mention.send("You were removed from a task");
      mention.send(TaskService.formatTaskEmbed(message, selectedTask));

      selectedTask.participants.forEach((participant) => {
        const otherParticipant = message.guild.member(participant);
        otherParticipant.send(
          `<@${mention.id}> was removed from a task you're on`
        );
        otherParticipant.send(
          TaskService.formatTaskEmbed(message, selectedTask)
        );
      });
    } catch (err) {
      console.log("wrong channel");
      console.log(err);
      message.react(config.reactions.error());
    }
  },
};
