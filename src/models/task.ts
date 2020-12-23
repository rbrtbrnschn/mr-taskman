import mongoose, { Schema, Types } from "mongoose";
import ColumnModel from "./column";

export interface TaskBase {
  title: string;
  description?: string;
  participants: Array<string>;
  deadline?: Date;
  taskId: string;
  messageIds?: Types.Map<string>;
  guildId: string;
  columnId: string; // deprecated soon
  columns: unknown;
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
  title: String,
  description: { type: String, default: "\u200b" },
  participants: [],
  deadline: Date,
  taskId: String,
  messageIds: { type: Map, of: String, default: {} },
  guildId: String,
  columnId: String, // depecrated soon
  columns: [{ type: Schema.Types.ObjectId, ref: "columns" }],
  completed: { type: Boolean, default: false },
  createdTimestamp: { type: Number, default: Date.now() },
  completedTimestamp: { type: Number, default: 0 },
  wip: { type: Boolean, default: false },
});

const TaskModel = mongoose.model<TaskInterface>("tasks", taskSchema);

export default TaskModel;
