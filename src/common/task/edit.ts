import Task from "../../interfaces/Task";
import Discord from "discord.js";

function editTask(message: Discord.Message, editedTask: Task): Task {
    // TODO 
    return editedTask;
}

export = { edit: editTask };