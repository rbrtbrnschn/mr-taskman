import Discord from "discord.js";
import config from "../../config";
import GuildService from "../../services/guild";
import TaskService from "../../services/task";
import areTextChannels from "../../utils/areTextChannels";

const { messages } = config;

export = {
  name: "create",
  description: "creates task",
  usage: "<title>",
  args: true,
  guildOnly: true,
  category: "task",
  execute: async function (
    message: Discord.Message,
    args: Array<string>
  ): Promise<Discord.Message> {
    try {
      const foundGuild = await GuildService.fetch(message);

      // if (foundGuild.channelIds.length < 1) {
      //   return message.reply("channels not set");
      // }
      const task = await TaskService.create(args.join(" "), message);

      const userId = message.author.id;

      const channels = foundGuild.channelIds.map((id) =>
        message.guild.channels.cache.get(id)
      );
      // Using a type guard to narrow down the correct type
      if (!areTextChannels(channels)) return;

      const embed = TaskService.formatTaskEmbed(message, task);

      for (const channel of channels) {
        const message = await channel.send(embed);
        task.messageIds.set(channel.id, message.id);
      }
      task.save();

      // Add Reaction Listener
      // await sent.react("☝️");
      // setupListener();
      // function setupListener() {
      //   console.log("started ");
      //   const filter = (
      //     reaction: Discord.MessageReaction,
      //     user: Discord.User
      //   ) => reaction.emoji.name === "👌";
      //   const collector = message.createReactionCollector(filter, {
      //     time: 15000,
      //   });
      //   collector.on("collect", onCollect);
      //   collector.on("end", setupListener);
      // }

      // Reference Task In Guild
      foundGuild.tasks.push(task._id);
      foundGuild.markModified("tasks");
      // if (!foundGuild.selectedTasks.size) foundGuild.selectedTasks = new Map();
      // Select Task
      // if (!foundGuild.selectedTasks) foundGuild.selectedTasks = new Map();
      foundGuild.nextTaskId++;
      foundGuild.markModified("nextTaskId");
      foundGuild.selectedTasks.set(userId, task._id); // ALL THIS SHOULD BE MOVED TO THE SERVICE. COMMANDS SHOULDNT TOUCH MODELS
      foundGuild.markModified("selectedTasks");
      foundGuild.save();

      return message.reply(
        `Task created in ${channels
          .map((channel) => `<#${channel.id}>`)
          .join(", ")}`
      );
    } catch (error) {
      if (error.code === 11000) {
        // likely a duplicate task title
        return message.reply(
          "Were you dropped on your head as a child? That title has already been used"
        );
      }
      // TODO REMOVE LINE BELOW
      console.log(error);
      return message.reply(messages.error());
    }
  },
};

// function onCollect(emoji: Discord.MessageReaction, user: Discord.User) {
//   console.log(user.username);
// }
