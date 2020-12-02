import fs from "fs";
import {Collection} from 'discord.js';
import Command from "../interfaces/command";
import config from "../config";

export default async (commands: Collection<string, Command>): Promise<void> => {
  const path = config.bot.path2Commands;
  const readDir = fs.readdirSync(path);
  const extension = config.bot.isProd ? ".js" : ".ts";
  const files = readDir.filter((val) => val.endsWith(extension));
  const dirs = readDir.filter((val) => !val.endsWith(extension));

  // Propegate Root Files
  files.forEach(async function (f): Promise<void> {
    const cmd: Command = await import(`${path}/${f}`);
    commands.set(cmd.name, cmd);
  });

  // Propegate Subfolders
  dirs.forEach(function (d): void {
    const files = fs.readdirSync(`${path}/${d}`);
    files.forEach(async function (f): Promise<void> {
      const cmd: Command = await import(`${path}/${d}/${f}`);
      commands.set(cmd.name, cmd);
    });
  });
};
