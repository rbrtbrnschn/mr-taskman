import Discord from "discord.js";
import TaskService from "../../services/task";
import config from "../../config";
import areTextChannels from "../../utils/areTextChannels";

export = {
  name: "add",
  description: "adds participants",
  usage: "<@mentioned user>",
  args: true,
  guildOnly: true,
  category: "task",
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
    if (hasParticpant) {
      message.reply(config.messages.error()); // TODO give back config.messages.hasParticipant()
      return;
    }
    TaskService.addParticipant(selectedTask, mention.id);

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
          .map((id) => `<@${id}>`)
          .join(", ");
        embed.fields[fieldIndex].value = participantString;
        taskMessage.edit(embed);
      });

      const onlyParicipant =
        selectedTask.participants.length === 1 &&
        selectedTask.participants[0] === mention.id;
      if (onlyParicipant) {
        return; //no notification needed
      }

      selectedTask.participants.forEach((participant) => {
        if (participant === mention.id) {
          mention.send("You were added to a task");
          mention.send(TaskService.formatTaskEmbed(message, selectedTask));
        } else {
          const otherParticipant = message.guild.member(participant);
          otherParticipant.send(
            `<@${mention.id}> was added to a task you're on`
          );
          otherParticipant.send(
            TaskService.formatTaskEmbed(message, selectedTask)
          );
        }
      });
    } catch (err) {
      console.log("wrong channel");
      console.log(err);
      message.react(config.reactions.error());
    }
  },
};
