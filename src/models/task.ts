import mongoose, { Schema, Types } from "mongoose";
import ColumnModel from "./column";

export interface PopulatableTaskInterface {
  columns?: unknown;
}
/**
 * @param {string} title - Title.
 * @param {string} description - Description.
 * @param {string[]} participants - List of participants.
 * @param {Date} deadline - Deadline Date object.
 * @param {string} taskIdentifier - Simple identifier ie. #`4072`.
 * @param {string[]} messageIds - List of corresponding messages displaying `task`.
 * @param {mongoose.Schema.Types.ObjectId} guildId - **ObjectId** of `guild` instance.
 * @param {boolean} completed - Boolean, defining if `task` has been completed or not.
 * @param {number} createdTimestamp - Unix timestamp from the moment, a `task` instance is created.
 * @param {number} completedTimestamp - Unix timestamp from the moment a `task` instance is completed.
 * @param {boolean} wip - Boolean, defining current status ie. "currently working on it" or "not started yet".
 * @param {mongoose.Schema.Types.ObjectId[]} columns - List of all associated `column` instances.
 */
export interface TaskBase extends PopulatableTaskInterface {
  title: string;
  description?: string;
  participants?: Array<string>;
  deadline?: Date;
  taskIdentifier?: number;
  messageIds?: Types.Map<string>;
  guildId: mongoose.Types.ObjectId;
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
  deadline: { type: Date },
  taskIdentifier: { type: Number, required: false },
  messageIds: { type: Map, of: String, default: {} },
  guildId: { type: mongoose.Types.ObjectId, required: true, ref: "guild" },
  completed: { type: Boolean, default: false },
  createdTimestamp: { type: Number, default: Date.now() },
  completedTimestamp: { type: Number, default: 0 },
  wip: { type: Boolean, default: false },
  columns: [{ type: Schema.Types.ObjectId, ref: "columns", default: [] }],
});

const TaskModel = mongoose.model<TaskInterface>("tasks", taskSchema);

export default TaskModel;
