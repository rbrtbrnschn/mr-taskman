import { manager } from "../index";
import chalk from "chalk";

export = function () {
    console.log(`${chalk.magenta.bold("[DISCORD]:")}${chalk.reset()} Connection established.`);
    // console.log(`Logged in as ${manager.client.user.tag}!`);
}
