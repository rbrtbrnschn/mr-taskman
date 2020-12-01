import mongoose, { Schema, Types } from "mongoose";

export interface GuildInterface extends mongoose.Document {
  guildId: string;
  channelIds: string[];
  ownerId: string;
  roles: Record<string, string>; // name : id of a Discord.Role
  tasks: Types.Array<Schema.Types.ObjectId>;
}

const guildSchema = new Schema({
  guildId: String,
  channelIds: { type: [String], default: [] },
  ownerId: String,
  roles: Object,
  tasks: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
});

const GuildModel = mongoose.model<GuildInterface>("guilds", guildSchema);

export default GuildModel;
