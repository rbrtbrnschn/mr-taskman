import Query, { QueryClass } from "../models/query";
import { GuildService } from ".";
import BoardModel, {
  BoardBase,
  BoardInterface,
  BoardPopulatedInterface,
} from "../models/board";
import Errors from "../models/errors";
import { GuildInterface, GuildPopulatedInterface } from "../models/guild";
import throwError from "../utils/errors";
import GenericService from "./service";

/**
 * Service serving as interface between all things `board` and the backend.
 */
class BoardService extends GenericService {
  constructor() {
    super();
  }
  /**
   * Instantiates new `board` instance.
   * @param {BoardBase} boardBase - Necessary properties to instantiate new `board` instance.
   */
  async create(boardBase: BoardBase) {
    /*
      1. validate guildId, label unique withn guild scopes
      2. create
      3. link to guild
    */
    try {
      // [1]
      const { guildId, label } = boardBase;
      const existingGuilId = await GuildService.isExistingGuildId(guildId);
      if (!existingGuilId)
        throwError(
          `Malformed guild id: ${guildId}`,
          Errors.malformedGuildId,
          __dirname,
          __filename
        );
      const populatedGuild = (await GuildService.fetch({
        key: "_id",
        value: guildId,
      }).then(populateGuild)) as GuildPopulatedInterface;
      const existingLabel = populatedGuild.boards.find(
        (e: BoardInterface) => e.label === label
      );
      if (existingLabel)
        throwError(
          `malformed label: ${label}`,
          Errors.malformedLabel,
          __dirname,
          __filename
        );

      // [2]
      const board = new BoardModel(boardBase);
      // [3]
      board
        .save()
        .then((_board: BoardInterface) =>
          addBoardRefToGuild(_board, populatedGuild)
        );
    } catch (err) {
      console.log(err);
    }
  }
  /**
   * Edits given `board` instance.
   * @param {Query} query - Query object.
   * @param {Query} replace - Query object.
   */
  async edit<K extends keyof BoardInterface>(
    query: Query<BoardInterface, K>,
    replace: Query<BoardInterface, K>
  ): Promise<BoardInterface> {
    /*
      1. Fetch
      2. Edit
      3. Save
    */
    try {
      // [1]
      const board = await this.fetch(query);
      if (!board) return; // TODO, no need to trow an error again, since that's been caught in this.fetch

      // [2]
      board[replace.key] = replace.value;
      board.markModified(replace.key);
      // [3]
      board.save();
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Deletes given `board` instance.
   * @param {Query} query - Query object.
   */
  async delete<K extends keyof BoardInterface>(
    query: Query<BoardInterface, K>
  ): Promise<BoardInterface> {
    /*flow
      1. fetch
      2. validate
      3. delete
    */
    try {
      // [1]
      const board = await this.fetch(query);
      // [2]
      if (!board) return;
      // [3]
      return await board.deleteOne().then((board) => board);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Fetches given `board` instance.
   * @param {Query} query - Query object.
   */
  async fetch<K extends keyof BoardInterface>(
    query: Query<BoardInterface, K>
  ): Promise<BoardInterface> {
    /*flow
      1. find
      2. validate
    */
    try {
      // [1]
      const board = await BoardModel.findOne(new QueryClass(query).transform());
      // [2]
      if (!board)
        throwError(
          "Insufficient query",
          Errors.insufficientQuery,
          __dirname,
          __filename
        );

      return board;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Populates **columns** field on given `board` instance.
   * @param {Query} query - Query object.
   */
  async populate<K extends keyof BoardInterface>(
    query: Query<BoardInterface, K>
  ): Promise<BoardPopulatedInterface> {
    try {
      /*flow
        1. fetch
        2. validate
        3. populate
      */
      // [1]
      const board = await this.fetch(query);
      // [2]
      if (!board)
        throwError(
          `Insufficient query: ${query}`,
          Errors.insufficientQuery,
          __dirname,
          __filename
        );
      // [3]
      const populatedBoard = (await board
        .populate("columns")
        .execPopulate()) as unknown;

      return <BoardPopulatedInterface>populatedBoard;
    } catch (err) {
      console.log(err);
    }
  }
}

const boardService = new BoardService();
export default boardService;

//! Helpers

async function populateGuild(
  guild: GuildInterface
): Promise<GuildPopulatedInterface | GuildInterface> {
  return await guild.populate("boards").execPopulate();
}

async function addBoardRefToGuild(
  board: BoardInterface,
  guild: GuildPopulatedInterface
): Promise<void> {
  guild.boards.push(board._id);
  guild.markModified("boards");
  guild.save();
}
