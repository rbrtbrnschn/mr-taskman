import mongoose, { Schema } from "mongoose";

export interface TaskInterface extends mongoose.Document {
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
const taskSchema = new Schema({
  title: String,
  description: { type: String, default: "\u200b" },
  participants: [],
  deadline: Date,
  taskId: String,
  messagedId: { type: String, default: "" },
  guildId: String, // technically not necessary
  completed: { type: Boolean, default: false },
  createdTimestamp: { type: Number, default: Date.now() },
  completedTimestamp: { type: Number, default: 0 },
  wip: { type: Boolean, default: false },
});

const TaskModel = mongoose.model<TaskInterface>("tasks", taskSchema);

export default TaskModel;
