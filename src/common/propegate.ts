import fs from "fs";
import { manager } from "../index";
import Command from "../interfaces/command";
import { bot } from "../config";

function propegate({ path = bot.path2Commands, collection = manager.commands } = {}): void {
    const readDir = fs.readdirSync(path);
    const extension = bot.isProd ? ".js" : ".ts";
    const files = readDir.filter((val) => val.endsWith(extension));
    const dirs = readDir.filter((val) => !val.endsWith(extension));

    // Propegate Root Files
    files.forEach(async function (f): Promise<void> {
        const cmd: Command = await import(`${path}/${f}`);
        manager.commands.set(cmd.name, cmd);
    });

    // Propegate Subfolders
    dirs.forEach(function (d): void {
        const files = fs.readdirSync(`${path}/${d}`);
        files.forEach(async function (f): Promise<void> {
            const cmd: Command = await import(`${path}/${d}/${f}`);
            manager.commands.set(cmd.name, cmd);
        });
    });
}
export = propegate;