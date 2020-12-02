import mongoose, { Schema } from "mongoose";

export interface IChannel extends mongoose.Document {
  title: string;
  description: string;
  participants: Array<string>;
  deadline: Date;
  taskId: string;
  messageId: string;
  guildId: string;
  completed: boolean;
  createdTimestamp: number;
  completedTimestamp: number;
  wip: boolean;
}

const channelSchema = new Schema({
  title: String,
  description: { type: String, default: "\u200b" },
  participants: [],
  deadline: Date,
  taskId: String,
  messageId: String,
  guildId: String, // technically not necessary
  completed: { type: Boolean, default: false },
  createdTimestamp: { type: Number, default: Date.now() },
  completedTimestamp: { type: Number, default: 0 },
  wip: { type: Boolean, default: false },
});

const TaskModel = mongoose.model<TaskInterface>("channels", channelSchema);

export default TaskModel;
