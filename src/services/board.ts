import config from "../config";
import BoardModel, {
  BoardInterface,
  BoardBase,
  BoardPopulatedInterface,
} from "../models/board";
import GuildService from "./guild";
import { GuildInterface } from "../models/guild";
import { log } from "../utils/loggers";

class BoardService {
  /**
   * Creates a new board instance.
   * @param {BoardBase} params - necessary fields of board model to create a new instance
   */
  async create<T extends BoardBase>(params: T): Promise<BoardInterface> {
    try {
      // Validate GuildId
      const validGuildId = await config.thirdpartyService.isGuildId(
        params.guildId
      );
      if (!validGuildId) throw new Error("[COLUMN]: Missing GuildId");

      // Validate BoardId
      const validBoardId = await this.isValidBoardId(params.boardId);
      if (validBoardId) throw new Error("[COLUMN]: board id already in use");

      // Instantiate New Board
      const linkBoardToGuild = async (docs: BoardInterface) => {
        const guild = (await GuildService.fetch(
          docs.guildId
        )) as GuildInterface;
        guild.boards.push(docs._id);
        guild.markModified("boards");
        guild.save();
        return docs;
      };

      // Link new board _id to guild
      return await new BoardModel(params).save().then(linkBoardToGuild);
    } catch (err) {
      console.log(err);
    } finally {
      log("[BOARD]: created", "BBLUE");
    }
    return;
  }
  /**
   * Deletes a board.
   * @param {string} boardId - "boardId" of a board instance
   */
  async delete(boardId: string): Promise<void> {
    try {
      const deleted = await BoardModel.deleteOne({ boardId });
      if (!deleted.deletedCount) throw new Error("[BOARD]: malformed board id");
      log("[BOARD]: deleted", "BGREEN");
    } catch (err) {
      console.log(err);
    }
    return;
  }
  /**
   * Edits a board instance.
   * @param {BoardInterface} _old - current instance board
   * @param {keyof BoardInterface} key - key to be manipulated
   * @param {string} value - corresponding value to key
   */
  async edit(
    _old: BoardInterface,
    key: keyof BoardBase,
    value: any
  ): Promise<void> {
    try {
      if (!_old) throw new Error("[BOARD]: _old is undefined or null");

      // Get Board
      const { boardId } = _old;
      const current = (await this.fetch(boardId)) as BoardInterface;
      if (!current) throw new Error("[BOARD]: malformed board id");

      // Update
      current[key] = value;
      current.markModified(key);
      current.save();
    } catch (err) {
      console.log(err);
    }
    return;
  }

  /**
   * Fetches a board instance from the database.
   * Has option to populate one field of the board instance.
   * @param {string} boardId - "boardId" value of board instance
   * @param {populate: string} param1 - key of a board instance to be populated
   */
  async fetch<T extends { populate: keyof BoardInterface | "" }>(
    boardId: string,
    { populate = "" } = {} as T
  ): Promise<BoardPopulatedInterface | BoardInterface> {
    try {
      // Get Board
      const board = await BoardModel.findOne({ boardId: boardId });
      if (!board) throw new Error("[BOARD]: malformed board id");
      if (!populate.length) return board;

      // Populate
      const populatedBoard = (await board
        .populate(populate)
        .execPopulate()) as unknown;

      return <BoardPopulatedInterface>populatedBoard;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  /**
   * Returns true if board instance with "boardId" **does** **exists** in database.
   * Returns false if board instance with "boardId" **does not** exist in database.
   * @param {string} boardId - id of board
   */
  async isValidBoardId(boardId: string): Promise<boolean> {
    const board = (await BoardModel.findOne({ boardId })) as BoardInterface;
    if (!board) return false;
    return true;
  }
}

// console.log(
//   `${chalk.greenBright.bold(
//     "[Board Service]"
//   )}${chalk.reset()}: Singleton instantiated.`
// );
export default new BoardService();
