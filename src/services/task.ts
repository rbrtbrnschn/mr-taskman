import Discord from "discord.js";

import config from "../config";
import TaskModel, { TaskInterface } from "../models/task";
import { GuildPopulatedInterface } from "../models/guild";
import GuildService from "./guild";

class TaskService {
  #maxID = 0;

  async create(title: string, authorID: string): Promise<TaskInterface> {
    const taskModel = new TaskModel({
      title,
      participants: [authorID],
      taskId: this.generateID(),
    });
    return taskModel.save();
  }

  // Extensible with other typesigs
  async fetch(id: string): Promise<TaskInterface>;
  async fetch(param: unknown): Promise<TaskInterface> {
    let taskId;
    if (typeof param === "string") {
      taskId = param;
    }
    const foundTask = await TaskModel.findOne({ taskId });

    if (!foundTask) return;
    // This is invalid
    else return foundTask;
  }

  // Extensible with other typesigs
  async fetchByMessageId(messageId: string): Promise<TaskInterface> {
    const foundTask = await TaskModel.findOne({ messageId });

    if (!foundTask) return;
    // This is invalid
    else return foundTask;
  }

  async fetchSelected(message: Discord.Message): Promise<TaskInterface> {
    const userId = message.author.id;
    const guild = await GuildService.fetch(message);
    const populatedGuild = (await guild
      .populate("selectedTasks")
      .execPopulate()) as unknown; // Maybe population should be moved. Probably, even.
    return (<GuildPopulatedInterface>populatedGuild)
      .get("selectedTasks")
      .get(userId);
  }

  async select(
    message: Discord.Message,
    taskID: string
  ): Promise<TaskInterface> {
    const userId = message.author.id;
    const guild = await GuildService.fetch(message);
    const task = await this.fetch(taskID);
    guild.selectedTasks.set(userId, task._id);
    await guild.save();
    console.log(task, guild);
    return task;
  }
  async deselect(message: Discord.Message): Promise<void> {
    const userId = message.author.id;
    const guild = await GuildService.fetch(message);
    guild.selectedTasks.set(userId, null);
    guild.save();
  }
  deleteTask(message: Discord.Message): void {
    // TODO
  }

  editTask(message: Discord.Message, editedTask: TaskInterface): TaskInterface {
    // TODO
    return editedTask;
  }
  editTitle(
    message: Discord.Message,
    task: TaskInterface,
    title: string
  ): void {
    task.title = title;
    task.markModified("title");
    task.save();
  }
  editDescription(
    message: Discord.Message,
    task: TaskInterface,
    desc: string
  ): void {
    task.description = desc;
    task.markModified("description");
    task.save();
  }
  complete(message: Discord.Message, task: TaskInterface): void {
    task.completed = true;
    task.markModified("completed");
    task.wip = false;
    task.markModified("wip");
    task.completedTimestamp = Date.now();
    task.markModified("completedTimestamp");
    task.save();
  }
  wip(message: Discord.Message, task: TaskInterface): void {
    task.wip = true;
    task.markModified("wip");
    task.completed = false;
    task.markModified("completed");
    task.save();
  }
  addParticipant(task: TaskInterface, id: string): void {
    task.participants.push(id);
    task.markModified("participants");
    task.save();
  }
  removeParticipant(task: TaskInterface, id: string): void {
    const index = task.participants.findIndex((_id) => _id === id);
    if (index < 0) return;

    delete task.participants[index];
    task.participants = task.participants.filter((id) => id !== null);
    task.markModified("participants");
    task.save();
  }

  formatTaskEmbed(
    message: Discord.Message,
    task: TaskInterface
  ): Discord.MessageEmbed {
    const participants = task.participants.map((p) => {
      return message.guild.members.cache.get(p);
    });
    const color =
      !task.completed && !task.wip
        ? config.taskColors.created
        : !task.completed && task.wip
        ? config.taskColors.wip
        : task.completed
        ? config.taskColors.completed
        : "";
    const embed = new Discord.MessageEmbed()
      .setAuthor(
        message.guild.members.cache.get(message.author.id).nickname ||
          message.author.username
      )
      .setColor(color)
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
    this.#maxID += 1;
    return ("" + this.#maxID).padStart(4, "0"); //TODO
  }
}

export default new TaskService();
