import { Guild } from "discord.js";
import { GuildModel } from "../database/schemas";

export = function (guild: Guild): void {
    console.log("Created.");
    new GuildModel({
        guildId: guild.id,
        channelId: "",
        ownerId: guild.ownerID,
        roles: {
            admin: "",
            moderator: "",
        },
        tasks: []
    })
        .save((docs) => {
            console.log(docs);
        });
}