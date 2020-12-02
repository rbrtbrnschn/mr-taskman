import TaskInterface from "./task";
import mongoose, { Schema, Types } from "mongoose";

interface GuildBaseInterface extends mongoose.Document {
  guildId: string;
  channelIds: Array<string>;
  ownerId: string;
  roles: Record<string, string>; // name : id of a Discord.Role
}

export interface GuildInterface extends GuildBaseInterface {
  tasks: Types.Array<Types.ObjectId>;
  selectedTasks: Record<string, Types.ObjectId>;
}

export interface GuildPopulatedInterface extends GuildBaseInterface {
  tasks: Types.Array<typeof TaskInterface>;
  selectedTasks: Record<string, typeof TaskInterface>;
}

const guildSchema = new Schema({
  guildId: String,
  channelIds: { type: [String], default: [] },
  ownerId: String,
  roles: Object,
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "tasks",
    },
  ],
  selectedTasks: {
    type: Map,
    of: {
      type: Schema.Types.ObjectId,
      ref: "tasks",
    },
  },
});

const GuildModel = mongoose.model<GuildInterface>("guilds", guildSchema);

export default GuildModel;
