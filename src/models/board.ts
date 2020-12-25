import mongoose, { Schema, Types } from "mongoose";
import ColumnModel from "./column";
import Permissions from "./permissions";
/* 
  Not sure Typescript Enums Are Supported As value for mongoose schema porperty: "enum"
  Hence, converting enums to an array at the moment.
  https://github.com/Automattic/mongoose/issues/9535
*/

export interface PopulatableBoardInterface {
  columns?: unknown;
}
export interface BoardBase extends PopulatableBoardInterface {
  guildId: mongoose.Types.ObjectId;
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
  guildId: { type: mongoose.Types.ObjectId, required: true, ref: "guild" },
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
