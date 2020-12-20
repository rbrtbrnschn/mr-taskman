import mongoose, { Schema, Types } from "mongoose";
import TaskInterface from "./task";

interface ColumnBaseInterface extends mongoose.Document {
  columnId: string;
  label: string;
  permissions: string;
  guildId: string;
}

export interface ColumnInterface extends ColumnBaseInterface {
  tasks: Types.Array<Schema.Types.ObjectId>;
}

export interface ColumnPopulatedInterface extends ColumnBaseInterface {
  tasks: Types.Array<typeof TaskInterface>;
}

const columnSchema = new Schema<ColumnBaseInterface>();
// {
// columnId: String,
// label: String,
// permissions: String,
// guildId: String,
// }

const ColumnModel = mongoose.model<ColumnInterface>("columns", columnSchema);

export default ColumnModel;
