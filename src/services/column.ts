import { log } from "../utils/loggers";
import {
  ColumnBase,
  ColumnInterface,
  ColumnPopulatedInterface,
} from "../models/column";
import ColumnModel, { PopulatableColumnInterface } from "../models/column";
import config from "../config";
import BoardService from "./board";
import { BoardInterface } from "../models/board";

class ColumnService {
  /**
   * Instantiate new board instance.
   * @param {ColumnBase} params - necessary fields of board model to create a new instance
   */
  async create<T extends ColumnBase>(params: T): Promise<ColumnInterface> {
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
      ): Promise<ColumnInterface> => {
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
          return docs;
        } catch (err) {
          console.log(err);
        }
      };

      // Link new column to board
      log("[COLUMN]: created", "BBLUE");
      return new ColumnModel(params).save().then(linkColumnToBoard);
    } catch (err) {
      console.log(err);
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
   * @param {any} value - corresponding value to key
   */
  async edit(
    _old: ColumnInterface,
    key: keyof ColumnBase,
    value: any
  ): Promise<void> {
    try {
      if (!_old) throw new Error("[COLUMN]: _old is undefined or null");

      // Get Column
      const { columnId } = _old;
      const current = (await this.fetch(columnId)) as ColumnInterface; // *1
      if (!current) throw new Error("[COLUMN]: malformed column id");

      // Update
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
  /**
   * @namespace
   * @param {object} params
   * @property {string} params.key - query key
   * @property {any} params.value - query value
   * @property {string?} populate - **optional** key of column model to be populated
   */
  async fetch2<
    T extends {
      query: { key: keyof ColumnBase; value: any };
      populate?: keyof PopulatableColumnInterface;
    }
  >(params: T): Promise<ColumnInterface> {
    const { query, populate } = params;
    const { key, value } = query;

    // Fetch
    try {
      const column = await ColumnModel.findOne({ [key]: value });
      if (!column) throw new Error("[COLUMN FETCH]: query was insufficient");
      if (!populate) return column;

      // Populate
      try {
        const populatedColumn = (await column
          .populate(populate)
          .execPopulate()) as unknown;
        if (!populatedColumn)
          throw new Error(
            "[COLUMN FETCH POPULATE]: {populate} was insufficient"
          );

        return column;
      } catch (err) {
        console.log(err);
      }
    } catch (er) {
      console.log(er);
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
