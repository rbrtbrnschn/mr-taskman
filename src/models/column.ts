import mongoose, { Schema, Types } from "mongoose";
import TaskInterface from "./task";

export interface PopulatableColumnInterface {
  tasks?: unknown;
}
export interface ColumnBase extends PopulatableColumnInterface {
  guildId: string;
  boardId: string;
  columnId: string;
  ownerId: string;
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
  columnId: String,
  label: String,
  permissions: String,
  guildId: String,
  ownerId: String,
  boardId: String,
});

const ColumnModel = mongoose.model<ColumnInterface>("columns", columnSchema);

export default ColumnModel;
