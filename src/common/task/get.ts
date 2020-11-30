import Task from "../../interfaces/Task";
import Discord from "discord.js";

function getTaskById(message: Discord.Message): Task {
    //TODO
    return new Task(message, "FAKETASK");
}

function getSelectedTask(message: Discord.Message): Task {
    //TODO
    return new Task(message, "FAKETASK");
}

export { getTaskById, getSelectedTask };
