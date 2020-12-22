// import chalk from "chalk";
// import messages from "../data/messages";

// interface ColorsInterface {
//   RED: chalk.Chalk;
//   GREEN: chalk.Chalk;
//   BLUE: chalk.Chalk;
//   CYAN: chalk.Chalk;
//   WHITE: chalk.Chalk;
//   BRED: chalk.Chalk;
//   BGREEN: chalk.Chalk;
//   BBLUE: chalk.Chalk;
//   BCYAN: chalk.Chalk;
//   BWHITE: chalk.Chalk;
// }

// const Colors = Object.freeze({
//   //! Standard
//   RED: chalk.red,
//   GREEN: chalk.green,
//   BLUE: chalk.blue,
//   CYAN: chalk.cyan,
//   WHITE: chalk.white,

//   //! Bolds
//   BRED: chalk.red.bold,
//   BGREEN: chalk.green.bold,
//   BBLUE: chalk.blue.bold,
//   BCYAN: chalk.cyan.bold,
//   BWHITE: chalk.white.bold,
// } as ColorsInterface);

// type ColorKeys = keyof ColorsInterface;

// export function log2(
//   message: string | null,
//   color: keyof chalk.Chalk = "white"
// ): void {
//   console.log(chalk[color]);
// }

export function log(message: string | null, color?: string): void {
  console.log(message);
}

export default {};
