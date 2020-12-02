import mongoose from "mongoose";

export default class Task {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  createdTimestamp: number;
  description: string;
  participants: Array<string>;
  deadline: Date;
  messageId: string;
  taskId: string;

  constructor(title: string, authorID: string) {
    this.title = title;
    this.description = "\u200b";
    this.createdTimestamp = Date.now();
    this.participants = [authorID];
    // this.deadline = new Date();
    this.messageId = "";
    this.taskId = ""; // Discord Like Tag (ie. #0303, simply without the "#")
  }
}
