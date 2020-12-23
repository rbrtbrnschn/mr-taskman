import mongoose, { Schema, Types } from "mongoose";
import TaskInterface from "./task";

export interface ColumnBase {
  guildId: string;
  boardId: string;
  columnId: string;
  ownerId: string;
  label?: string;
  permissions?: string;
  tasks?: unknown;
}
interface ColumnBaseInterface extends ColumnBase, mongoose.Document {}

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
