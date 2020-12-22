import mongoose, { Schema, Types } from "mongoose";
import ColumnInterface from "./column";

export interface BoardBase {
  guildId: string;
  boardId: string;
  ownerId: string;
  label?: string;
  permissions?: string;
}

interface BoardBaseInterface extends BoardBase, mongoose.Document {}

export interface BoardInterface extends BoardBaseInterface {
  columns: Types.Array<Schema.Types.ObjectId>;
}

export interface BoardPopulatedInterface extends BoardBaseInterface {
  columns: Types.Array<typeof ColumnInterface>;
}

const boardSchema = new Schema<BoardBaseInterface>({
  label: { type: String, default: "" },
  boardId: String,
  ownerId: String,
  permissions: { type: String, default: "" },
  guildId: String,
});

const BoardModel = mongoose.model<BoardInterface>("boards", boardSchema);

export default BoardModel;
