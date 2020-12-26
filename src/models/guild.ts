import TaskInterface from "./task";
import BoardInterface from "./board";
import mongoose, { Schema, Types } from "mongoose";
/* 
  Not sure Typescript Enums Are Supported As value for mongoose schema porperty: "enum"
  Hence, converting enums to an array at the moment.
  https://github.com/Automattic/mongoose/issues/9535
*/

export interface PopuplatableGuildInterface {
  tasks?: unknown;
  boards?: unknown;
  selectedTasks?: unknown;
}

export interface GuildBase extends PopuplatableGuildInterface {
  ownerIdentifier: string;
  nextTaskIdentifier: number;
  roles: Record<string, string>;
  channelIds: Array<string>; //@deprecated soon
  guildIdentifier: string;
}
interface GuildBaseInterface extends GuildBase, mongoose.Document {}

export interface GuildInterface extends GuildBaseInterface {
  tasks: Types.Array<Schema.Types.ObjectId>; //@deprecated soon
  selectedTasks: Types.Map<Types.ObjectId>;
  boards: Types.Array<Types.ObjectId>;
}

export interface GuildPopulatedInterface extends GuildBaseInterface {
  tasks: Types.Array<typeof TaskInterface>; //@deprecated soon
  selectedTasks: Types.Map<typeof TaskInterface>;
  boards: Types.Array<typeof BoardInterface>;
}

const guildSchema = new Schema({
  ownerIdentifier: { type: String, required: true },
  nextTaskId: {
    type: Number,
    default: 0,
  },
  roles: { type: Object, default: {} },
  guildIdentifier: { type: String, required: true },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "tasks",
      default: [],
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
  },

  boards: [
    {
      type: Schema.Types.ObjectId,
      ref: "boards",
      default: [],
    },
  ],
  channelIds: { type: [String], default: [] }, //@deprecated soon
});

const GuildModel = mongoose.model<GuildInterface>("guilds", guildSchema);

export default GuildModel;
