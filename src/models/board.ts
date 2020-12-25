import mongoose, { Schema, Types } from "mongoose";
import ColumnModel from "./column";
import Permissions from "./permissions";

export interface PopulatableBoardInterface {
  columns?: unknown;
}
export interface BoardBase extends PopulatableBoardInterface {
  guildId: string;
  ownerId: string;
  label?: string;
  permissions?: string;
}

interface BoardBaseInterface extends BoardBase, mongoose.Document {}

export interface BoardInterface extends BoardBaseInterface {
  columns: Types.Array<Schema.Types.ObjectId>;
}

export interface BoardPopulatedInterface extends BoardBaseInterface {
  columns: Types.Array<typeof ColumnModel>;
}

const boardSchema = new Schema<BoardBaseInterface>({
  guildId: { type: String, required: true },
  ownerId: { type: String, required: true },
  label: { type: String, required: true },
  permissions: {
    type: String,
    default: Permissions.everyone,
    enum: Object.values(Permissions),
  },
  columns: [{ type: Schema.Types.ObjectId, ref: "columns", default: [] }],
});

const BoardModel = mongoose.model<BoardInterface>("boards", boardSchema);

export default BoardModel;
