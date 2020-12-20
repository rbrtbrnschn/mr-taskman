import chalk from "chalk";
import { BoardInterface } from "../models/board";
// Set service on init
// Save to config potentially

interface createBoard {
  guildId: string;
  ownerId: string;
  label?: string;
  permissions?: string;
}

class BoardService {
  create<T extends createBoard>(params: T): void {
    return;
  }
  async delete(_guildId: string): Promise<void> {
    return;
  }
  async edit(_old: BoardInterface, _new: BoardInterface): Promise<void> {
    return;
  }
}

console.log(
  `${chalk.greenBright.bold(
    "[Board Service]"
  )}${chalk.reset()}: Singleton instantiated.`
);
export default new BoardService();
