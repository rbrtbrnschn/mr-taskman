import mongoose, { Schema, Types } from "mongoose";
import { TaskInterface } from "./task";
import Permissions from "./permissions";
/* 
  Not sure Typescript Enums Are Supported As value for mongoose schema porperty: "enum"
  Hence, converting enums to an array at the moment.
  https://github.com/Automattic/mongoose/issues/9535
*/

export interface PopulatableColumnInterface {
  tasks?: Array<unknown>;
}
export interface ColumnBase extends PopulatableColumnInterface {
  guildId: mongoose.Types.ObjectId;
  boardId: mongoose.Types.ObjectId;
  ownerId: string;
  columnIdentifier?: string;
  label?: string;
  permissions?: string;
}

export interface ColumnBaseInterface extends ColumnBase, mongoose.Document {}

export interface ColumnInterface extends ColumnBaseInterface {
  tasks: Types.Array<Schema.Types.ObjectId>;
}

export interface ColumnPopulatedInterface extends ColumnBaseInterface {
  tasks: Types.Array<TaskInterface>;
}

const columnSchema = new Schema<ColumnBaseInterface>({
  guildId: { type: mongoose.Types.ObjectId, required: true, ref: "guild" },
  boardId: { type: mongoose.Types.ObjectId, required: true, ref: "board" },
  ownerId: { type: String, required: true },
  columnIdentifier: { type: String, default: "" },
  label: { type: String, required: true },
  permissions: {
    type: String,
    default: Permissions.everyone,
    enum: Object.values(Permissions),
  },
  tasks: [{ default: [], type: mongoose.Types.ObjectId, ref: "tasks" }],
});

const ColumnModel = mongoose.model<ColumnInterface>("columns", columnSchema);

export default ColumnModel;
