import TaskInterface from "./task";
import mongoose, { Schema, Types } from "mongoose";

interface GuildBaseInterface extends mongoose.Document {
  guildId: string;
  channelIds: Array<string>;
  ownerId: string;
  nextTaskId: number;
  roles: Record<string, string>; // name : id of a Discord.Role
}

export interface GuildInterface extends GuildBaseInterface {
  tasks: Types.Array<Schema.Types.ObjectId>;
  selectedTasks: Types.Map<Types.ObjectId>;
}

export interface GuildPopulatedInterface extends GuildBaseInterface {
  tasks: Types.Array<typeof TaskInterface>;
  selectedTasks: Types.Map<typeof TaskInterface>;
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
});

const GuildModel = mongoose.model<GuildInterface>("guilds", guildSchema);

export default GuildModel;
