import chalk from "chalk";
import { Guild } from "discord.js";
import { GuildModel } from "../database/schemas";

export = async function (guild: Guild): Promise<void> {
    console.log(`${chalk.red.magenta("[DISCORD]:")}${chalk.reset()} \`${guild.name}\` left.`);
    // To delete Guild from database do as stated below
    // For Persistency, we do not removed kicked guilds from the database, incase they invite the bot again
    // const foundGuild = await GuildModel.deleteOne({guildId: guild.id});
}