import Task from "../../interfaces/Task";
import Discord from "discord.js";

//@ts-ignore
function editTask(message: Discord.Message, editedTask: Task): Task {
    // TODO
}

export = { edit: editTask };