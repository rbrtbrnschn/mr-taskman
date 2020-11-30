import Discord from "discord.js";
import Task from "../../interfaces/Task";
import TaskModel from "../../database/schemas/task";
import { getGuild } from "../../common/guild/get";
import generateId from "../../common/task/generateId";

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
      const foundGuild = await getGuild(message);
      const task = new Task(message, args.join(" "));
      task.taskId = generateId();

      // Create Task And Save
      const dbTask = await new TaskModel({ ...task });
      dbTask.save();
      foundGuild.tasks.push(dbTask.id);
      foundGuild.markModified("tasks");
      foundGuild.save();

      // TODO Select Task
      // TODO add selectedTasks to guild schema
      // TODO of type { userId: taskId || Mongoose.ObjectId referencing the task }

      const channel = message.guild.channels.cache.get(foundGuild.channelId);
      // Using a type guard to narrow down the correct type
      if (!isTextChannel(channel)) return;

      channel.send(`New task created by <@${message.author.id}>`);
      return message.reply(`Task created in <#${channel.id}>.Go check it out`);
    } catch (error) {
      if (error.code === 11000) {
        // likely a duplicate task title
        return message.reply(
          "Were you dropped on your head as a child? That title has already been used"
        );
      }
      return message.reply(
        "Something went wrong creating the task. Please try again"
      );
    }
  },
};

function isTextChannel(
  channel: Discord.GuildChannel
): channel is Discord.TextChannel {
  return channel instanceof Discord.TextChannel;
}
