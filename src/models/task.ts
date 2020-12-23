import mongoose, { Schema, Types } from "mongoose";

export interface TaskBase {
  title: string;
  description?: string;
  participants: Array<string>;
  deadline?: Date;
  taskId: string;
  messageIds?: Types.Map<string>;
  guildId: string;
  columnId: string;
  completed?: boolean;
  createdTimestamp?: number;
  completedTimestamp?: number;
  wip?: boolean;
}
export interface TaskInterface extends TaskBase, mongoose.Document {}

const taskSchema = new Schema({
  title: String,
  description: { type: String, default: "\u200b" },
  participants: [],
  deadline: Date,
  taskId: String,
  messageIds: { type: Map, of: String, default: {} },
  guildId: String, // technically not necessary
  columnId: String,
  completed: { type: Boolean, default: false },
  createdTimestamp: { type: Number, default: Date.now() },
  completedTimestamp: { type: Number, default: 0 },
  wip: { type: Boolean, default: false },
});

const TaskModel = mongoose.model<TaskInterface>("tasks", taskSchema);

export default TaskModel;
