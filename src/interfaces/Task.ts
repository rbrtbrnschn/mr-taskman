import Discord from "discord.js";

class Task {
    title: string;
    createdTimestamp: number;
    description: string;
    participants: Array<string>;
    deadline: Date;
    messageId: string;
    taskId: string;

    constructor(message: Discord.Message, title: string) {
        this.title = title;
        this.description = "\u200b";
        this.createdTimestamp = Date.now();
        this.participants = [message.author.id];
        this.deadline = new Date();
        this.messageId = "";
        this.taskId = ""; // Discord Like Tag (ie. #0303, simply without the "#")
    }
}

export = Task;