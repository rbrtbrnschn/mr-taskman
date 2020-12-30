import { TaskInterface } from "./task";
import { BoardInterface } from "./board";
import mongoose, { Schema, Types } from "mongoose";
import Roles from "./roles";
/* 
  Not sure Typescript Enums Are Supported As value for mongoose schema porperty: "enum"
  Hence, converting enums to an array at the moment.
  https://github.com/Automattic/mongoose/issues/9535
*/

export interface PopuplatableGuildInterface {
  tasks?: Array<unknown>;
  boards?: Array<unknown>;
  selectedTasks?: unknown;
}

export interface GuildBase extends PopuplatableGuildInterface {
  guildIdentifier: string;
  ownerIdentifier: string;
  roles?: Roles;
  channelIds?: Array<string>; //@deprecated soon
  nextTaskIdentifier?: number;
}
interface GuildBaseInterface extends GuildBase, mongoose.Document {}

export interface GuildInterface extends GuildBaseInterface {
  tasks: Types.Array<Schema.Types.ObjectId>; //@deprecated soon
  selectedTasks: Types.Map<Types.ObjectId>;
  boards: Types.Array<Types.ObjectId>;
}

export interface GuildPopulatedInterface extends GuildBaseInterface {
  tasks: Types.Array<TaskInterface>; //@deprecated soon
  selectedTasks: Types.Map<TaskInterface>;
  boards: Types.Array<BoardInterface>;
}

const guildSchema = new Schema({
  guildIdentifier: { type: String, required: true },
  ownerIdentifier: { type: String, required: true },
  nextTaskIdentifier: {
    type: Number,
    default: 0,
    required: false,
  },
  roles: {
    type: Object,
    default: { admin: "", moderator: "", everyone: "" } as Roles,
    required: false,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "tasks",
      default: [],
      required: false,
    },
  ],
  selectedTasks: {
    type: Map,
    default: {},
    of: {
      type: Schema.Types.ObjectId,
      ref: "tasks",
    },
    from: String,
    required: false,
  },

  boards: [
    {
      type: Schema.Types.ObjectId,
      ref: "boards",
      default: [],
      required: false,
    },
  ],
  channelIds: { type: [String], default: [], required: false }, //@deprecated soon
});

const GuildModel = mongoose.model<GuildInterface>("guilds", guildSchema);

export default GuildModel;
