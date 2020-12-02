import chalk from "chalk";
import { Guild } from "discord.js";
import GuildService from "../../services/guild";

export = async function (guild: Guild): Promise<void> {
  GuildService.create(guild);
};