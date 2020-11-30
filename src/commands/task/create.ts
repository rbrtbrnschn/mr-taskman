import Discord from "discord.js";
import { prefix } from "../../config";
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
      if (!foundGuild)
        return message.reply(
          "Guildo no existo. What manner of sorcery is this?"
        );
      if (foundGuild.channelId.length < 1)
        return message.reply(
          `You have got to set a channel to post the task in first...dumbass. Try \`${prefix}guild channel #channel-name\``
        );

      const task = new Task(message, args.join(" "));
      task.taskId = generateId();

      const dbTask = await new TaskModel({ ...task });
      await dbTask.save();
      //   work on selecting - TODO
      const channel = message.guild.channels.cache.get(foundGuild.channelId);
      if (!channel) {
        //   if for some reason the channel was nuked
        return message.reply(
          "Ye be trying to cast to a barrel that be lost at sea. Ye be a witch?"
        );
      }
      // Using a type guard to narrow down the correct type
      if (
        !((channel): channel is Discord.TextChannel => channel.type === "text")(
          channel
        )
      )
        return;

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
