// import { manager } from "../index";
import chalk from "chalk";

export default function (): void {
  console.log(
    `${chalk.magenta.bold(
      "[DISCORD]:"
    )}${chalk.reset()} Connection established.`
  );
}
