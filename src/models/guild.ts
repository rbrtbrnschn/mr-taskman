import TaskInterface from "./task";
import BoardInterface from "./board";
import mongoose, { Schema, Types } from "mongoose";

export interface GuildBase {
  guildId: string;
  channelIds: Array<string>;
  ownerId: string;
  nextTaskId: number;
  roles: Record<string, string>; // name : id of a Discord.Role
  boards: unknown;
}
interface GuildBaseInterface extends GuildBase, mongoose.Document {}

export interface GuildInterface extends GuildBaseInterface {
  tasks: Types.Array<Schema.Types.ObjectId>;
  selectedTasks: Types.Map<Types.ObjectId>;
  boards: Types.Array<Types.ObjectId>;
}

export interface GuildPopulatedInterface extends GuildBaseInterface {
  tasks: Types.Array<typeof TaskInterface>;
  selectedTasks: Types.Map<typeof TaskInterface>;
  boards: Types.Array<typeof BoardInterface>;
}

const guildSchema = new Schema({
  guildId: String,
  channelIds: { type: [String], default: [] },
  ownerId: String,
  nextTaskId: {
    type: Number,
    default: 0,
  },
  roles: Object,
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "tasks",
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
    },
  ],
});

const GuildModel = mongoose.model<GuildInterface>("guilds", guildSchema);

export default GuildModel;
