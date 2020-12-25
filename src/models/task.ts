import mongoose, { Schema, Types } from "mongoose";
import ColumnModel from "./column";

export interface PopulatableTaskInterface {
  columns?: unknown;
}
export interface TaskBase extends PopulatableTaskInterface {
  title: string;
  description?: string;
  participants?: Array<string>;
  deadline?: Date;
  taskId: string;
  messageIds?: Types.Map<string>;
  guildId: string;
  columnId: string; // deprecated soon
  completed?: boolean;
  createdTimestamp?: number;
  completedTimestamp?: number;
  wip?: boolean;
}

export interface TaskBaseInterface extends TaskBase, mongoose.Document {}

export interface TaskInterface extends TaskBaseInterface {
  columns: Types.Array<Schema.Types.ObjectId>;
}

export interface TaskPopulatedInterface extends TaskBaseInterface {
  columns: Types.Array<typeof ColumnModel>;
}

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "\u200b" },
  participants: [{ type: String, default: [] }],
  deadline: Date,
  taskId: { type: String, required: true },
  messageIds: { type: Map, of: String, default: {} },
  guildId: { type: String, required: true },
  // columnId: String, // depecrated soon
  completed: { type: Boolean, default: false },
  createdTimestamp: { type: Number, default: Date.now() },
  completedTimestamp: { type: Number, default: 0 },
  wip: { type: Boolean, default: false },
  columns: [{ type: Schema.Types.ObjectId, ref: "columns", default: [] }],
});

const TaskModel = mongoose.model<TaskInterface>("tasks", taskSchema);

export default TaskModel;
