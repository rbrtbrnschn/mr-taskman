import { log } from "../utils/loggers";
import {
  ColumnBase,
  ColumnInterface,
  ColumnPopulatedInterface,
} from "../models/column";
import ColumnModel from "../models/column";
import config from "../config";
import BoardService from "./board";
import { BoardInterface } from "../models/board";

class ColumnService {
  /**
   * Instantiate new board instance.
   * @param {ColumnBase} params - necessary fields of board model to create a new instance
   */
  async create<T extends ColumnBase>(params: T): Promise<void> {
    try {
      // Validate guildId
      const validGuildId = await config.thirdpartyService.isGuildId(
        params.guildId
      );
      if (!validGuildId) throw new Error("[COLUMN]: missing guild id");

      // Validate boardId
      const validBoardId = await BoardService.isValidBoardId(params.boardId);
      if (!validBoardId) throw new Error("[COLUMN]: malformed board id");

      // Validate columnId
      const validColumnId = await this.isValidColumnId(params.columnId);
      if (validColumnId) throw new Error("[COLUMN]: malformed column id");

      // Helpers
      const linkColumnToBoard = async (
        docs: ColumnInterface
      ): Promise<void> => {
        try {
          // Get board
          const board = (await BoardService.fetch(
            docs.boardId
          )) as BoardInterface;
          if (!board) throw new Error("[COLUMN]: malformed board id");

          // Link column _id
          board.columns.push(docs.id);
          board.markModified("columns");
          board.save();
        } catch (err) {
          console.log(err);
        }
      };

      // Link new column to board
      new ColumnModel(params).save().then(linkColumnToBoard);
    } catch (err) {
      console.log(err);
    } finally {
      log("[COLUMN]: created", "BBLUE");
    }
    return;
  }

  /**
   * Deletes column instance.
   * @param {string} guildId - *guildId* field of guild instance
   */
  async delete(columnId: string): Promise<void> {
    try {
      const column = await ColumnModel.deleteOne({ columnId });
      if (!column) throw new Error("[COLUMN]: malformed column id");
    } catch (err) {
      console.log(err);
    }
    return;
  }

  /**
   * Edits column instance.
   * @param {ColumnInterface} _old - current column instance
   * @param {keyof ColumnInterface} key - key to be manipulated
   * @param {string} value - corresponding value to key
   */
  async edit(
    _old: ColumnInterface,
    key: keyof ColumnInterface | keyof ColumnPopulatedInterface,
    value: string
  ): Promise<void> {
    try {
      if (!_old) throw new Error("[COLUMN]: _old is undefined or null");
      // TODO [*1]
      // Fix: "as any"
      // Occurance: current[key] = value;
      // Error: Type 'string' is not assignable to type 'never'.
      const { columnId } = _old;
      const current = (await this.fetch(columnId)) as any; // *1
      current[key] = value;

      current.markModified(key);
      current.save();
      return;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  /**
   * Fetches a column instance from the database.
   * Has option to populate one field of the column instance.
   * @param {string} boardId - "boardId" value of column instance
   * @param {populate: string} param1 - key of a column instance to be populated
   */
  async fetch<T extends { populate: keyof ColumnInterface | "" }>(
    columnId: string,
    { populate = "" } = {} as T
  ): Promise<ColumnPopulatedInterface | ColumnInterface> {
    try {
      // Get Column
      const column = await ColumnModel.findOne({ columnId });
      if (!column) throw new Error("[BOARD]: malformed board id");
      if (!populate.length) return column;

      // Populate
      const populatedBoard = (await column
        .populate(populate)
        .execPopulate()) as unknown;

      return <ColumnPopulatedInterface>populatedBoard;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async isValidColumnId(columnId: string): Promise<boolean> {
    const column = (await ColumnModel.findOne({ columnId })) as ColumnInterface;
    if (!column) return false;
    return true;
  }
}

// console.log(
//   `${chalk.greenBright.bold(
//     "[Column Service]"
//   )}${chalk.reset()}: Singleton instantiated.`
// );
export default new ColumnService();
