import mongoose, { Schema, Types } from "mongoose";
import TaskInterface from "./task";

interface ColumnBaseInterface extends mongoose.Document {
  columnId: string;
  label: string;
}

export interface ColumnInterface extends ColumnBaseInterface {
  tasks: Types.Array<Schema.Types.ObjectId>;
}

export interface ColumnPopulatedInterface extends ColumnBaseInterface {
  tasks: Types.Array<typeof TaskInterface>;
}

const columnSchema = new Schema({
  columnId: String,
  label: String,
});

const ColumnModel = mongoose.model<ColumnInterface>("columns", columnSchema);

export default ColumnModel;
