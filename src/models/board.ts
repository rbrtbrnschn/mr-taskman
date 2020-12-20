import mongoose, { Schema, Types } from "mongoose";
import ColumnInterface from "./column";

interface BoardBaseInterface extends mongoose.Document {
  label: string;
  boardId: string;
}

export interface BoardInterface extends BoardBaseInterface {
  columns: Types.Array<Schema.Types.ObjectId>;
}

export interface BoardPopulatedInterface extends BoardBaseInterface {
  columns: Types.Array<typeof ColumnInterface>;
}

const boardSchema = new Schema({
  label: String,
  boardId: String,
});

const BoardModel = mongoose.model<BoardInterface>("boards", boardSchema);

export default BoardModel;
