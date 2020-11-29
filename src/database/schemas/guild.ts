import mongoose, { Schema } from "mongoose";

export interface GuildInterface extends mongoose.Document {
    guildId: string;
    channelId: string;
    ownerId: string;
    roles: any;
    tasks: any;
}

const guildSchema = new Schema({
    guildId: String,
    channelId: { type: String, default: "" },
    ownerId: String,
    roles: {},
    tasks: []

});

const GuildModel = mongoose.model<GuildInterface>("guilds", guildSchema);

export default GuildModel;