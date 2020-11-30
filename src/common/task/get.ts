import Task from "../../interfaces/Task";
import Discord from "discord.js";
import { GuildInterface } from "../../database/schemas";

function getTaskById(message: Discord.Message, id: string): Task {
  //TODO
  return new Task(message, "FAKETASK");
}

function getSelectedTask(
  message: Discord.Message,
  dbGuild: GuildInterface
): Task {
  // dbGuild.populate("selectedTasks").execPopulate();
  const userId = message.author.id;
  const ObjectId = dbGuild.selectedTasks[userId];

  if (!ObjectId) return;

  //TODO
  return new Task(message, "FAKETASK");
}

export { getTaskById, getSelectedTask };
