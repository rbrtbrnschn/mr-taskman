import mongoose, { Schema } from "mongoose";

const guildSchema = new Schema({
    guildId: String,
    channelId: { type: String, default: "" },
    ownerId: String,
    roles: {},
    tasks: []

});

const GuildModel = mongoose.model("guilds", guildSchema);

export { GuildModel };