import Discord from "discord.js";

class Task {
    title: string;
    createdTimestamp: number;
    description: string;
    participants: Array<string>;
    deadline: Date;

    constructor(message: Discord.Message, title: string) {
        this.title = title;
        this.description = "\u200b";
        this.createdTimestamp = Date.now();
        this.participants = [message.author.id];
        this.deadline = new Date();
    }
}

export = Task;