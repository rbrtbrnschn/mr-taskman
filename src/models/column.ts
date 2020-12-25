import mongoose, { Schema, Types } from "mongoose";
import TaskInterface from "./task";
import Permissions from "./permissions";

export interface PopulatableColumnInterface {
  tasks?: unknown;
}
export interface ColumnBase extends PopulatableColumnInterface {
  guildId: string;
  boardId: string;
  ownerId: string;
  columnId?: string;
  label?: string;
  permissions?: string;
}

export interface ColumnBaseInterface extends ColumnBase, mongoose.Document {}

export interface ColumnInterface extends ColumnBaseInterface {
  tasks?: Types.Array<Schema.Types.ObjectId>;
}

export interface ColumnPopulatedInterface extends ColumnBaseInterface {
  tasks?: Types.Array<typeof TaskInterface>;
}

const columnSchema = new Schema<ColumnBaseInterface>({
  guildId: { type: String, required: true },
  boardId: { type: mongoose.Types.ObjectId, required: true },
  ownerId: { type: String, required: true },
  columnId: { type: String, default: "" },
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
