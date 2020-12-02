import chalk from "chalk";
import { Guild } from "discord.js";

export default async function (guild: Guild): Promise<void> {
  console.log(
    `${chalk.red.magenta("[DISCORD]:")}${chalk.reset()} \`${guild.name}\` left.`
  );
}
