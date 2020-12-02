import Discord from "discord.js";

import config from "../config";
import Task from "../interfaces/Task";
import { TaskInterface } from "../models/task";
import { GuildInterface } from "../models/guild";

class TaskService {
  create(title: string, authorID: string): Task {
    return new Task(title, authorID);
  }

  getTaskById(message: Discord.Message, id: string): Task {
    //TODO
    return new Task("FAKETASK", "fakeauthor");
  }

  getSelectedTask(message: Discord.Message, dbGuild: GuildInterface): Task {
    dbGuild
      .populate("selectedTasks")
      .execPopulate()
      .then((val) => console.log)
      .catch((err) => console.error);
    const userId = message.author.id;
    const ObjectId = dbGuild.selectedTasks[userId];

    if (!ObjectId) return;

    //TODO
    return new Task("FAKETASK", userId);
  }

  deleteTask(message: Discord.Message, editedTask: Task): void {
    // TODO
  }

  editTask(message: Discord.Message, editedTask: Task): Task {
    // TODO
    return editedTask;
  }

  formatTaskEmbed(
    message: Discord.Message,
    task: TaskInterface
  ): Discord.MessageEmbed {
    const participants = task.participants.map((p) => {
      return message.guild.members.cache.get(p);
    });
    const embed = new Discord.MessageEmbed()
      .setAuthor(
        message.guild.members.cache.get(message.author.id).nickname ||
          message.author.username
      )
      .setColor(config.taskColors.created)
      .setTimestamp()
      .setTitle(task.title)
      .addField("> Description:", task.description || "\u200b")
      .addField("> Participants:", participants.join(","))
      .addField(
        (task.deadline && "> Deadline:") || "\u200b",
        (task.deadline && task.deadline.toLocaleString()) || "\u200b"
      )
      .setFooter(`Id: #${task.taskId}`);
    return embed;
  }

  generateID(): string {
    return "0000"; //TODO
  }
}

export default new TaskService();
