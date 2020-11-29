import chalk from "chalk";
import { Guild } from "discord.js";
import { GuildModel } from "../database/schemas";

export = async function (guild: Guild): Promise<void> {
    const hasGuild = await GuildModel.findOne({ guildId: guild.id });

    if (!hasGuild) createNew(guild);
    else return;
}

function createNew(guild: Guild): void {
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
        .save()
        .then((docs) => console.log(`${chalk.magenta.bold("[DISCORD]:")}${chalk.reset()} Server \`${guild.name}\` joined.`));
}