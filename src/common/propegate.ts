import fs from "fs";
import { manager } from "../index";
import Command from "../interfaces/command";

function propegate({ path = process.env.PATH2COMMANDS, collection = manager.commands } = {}): void {
    const readDir = fs.readdirSync(path);
    const files = readDir.filter((val) => val.endsWith(".js"));
    const dirs = readDir.filter((val) => !val.endsWith(".js"));

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