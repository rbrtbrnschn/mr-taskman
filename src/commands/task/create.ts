import Discord from "discord.js";
import Task from "../../interfaces/Task";
import TaskModel from "../../database/schemas/task";
import { getGuild } from "../../common/guild/get";
import generateId from "../../common/task/generateId";
import { messages, prefix } from "../../config";
import { formatTaskEmbed } from "../../common/task/formatTaskEmbed";

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

      // bot NEEDS channels to post task in
      if (foundGuild.channelIds.length < 1)
        return message.reply(
          `Set channel(s) to post notification in. \nTry \`${prefix}guild channel #mention(s)\``
        );

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

      const channels = foundGuild.channelIds.map((id) =>
        message.guild.channels.cache.get(id)
      );

      // Using a type guard to narrow down the correct type
      if (!areTextChannels(channels)) return;

      const embed = formatTaskEmbed(message, dbTask);
      channels.forEach((channel) => {
        channel.send(embed);
      });

      return message.reply(
        `Task posted in ${channels.map((c) => `<#${c.id}>`).join(", ")}`
      );
    } catch (error) {
      if (error.code === 11000) {
        // likely a duplicate task title
        return message.reply(
          "Were you dropped on your head as a child? That title has already been used"
        );
      }
      return message.reply(messages.error());
    }
  },
};

function areTextChannels(
  channels: Discord.GuildChannel[]
): channels is Discord.TextChannel[] {
  return channels.every((channel) => channel instanceof Discord.TextChannel);
}
