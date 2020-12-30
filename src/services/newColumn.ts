import ColumnModel, {
  ColumnBase,
  ColumnInterface,
  ColumnPopulatedInterface,
} from "../models/column";
import { BoardInterface, BoardPopulatedInterface } from "../models/board";
import GenericService from "./service";
import throwError from "../utils/errors";
import Errors from "../models/errors";
import { Query, QueryClass } from "../models/query";
import { GuildService, BoardService } from ".";

class ColumnService extends GenericService {
  constructor() {
    super();
  }
  /**
   * Instantiates new `column` instance.
   * @param {ColumnBase} columnBase - base properties to instantiate `column` instance.
   */
  async create(columnBase: ColumnBase): Promise<ColumnService> {
    const { boardId, guildId, label } = columnBase;
    /*flow
      1. validate valid boardId, guildId
      2. validate existing label, which is unique within board scope
      3. create column
      4. link to board
    */
    try {
      // [2]
      const exisitingGuildId = await GuildService.isExisitingGuildId(guildId);
      if (!exisitingGuildId)
        throwError(
          `Malformed guild id: ${guildId}`,
          Errors.malformedGuildId,
          __dirname,
          __filename
        );
      const existingBoardId = await BoardService.isExistingBoardId(boardId);
      if (!existingBoardId)
        throwError(
          `Malformed board id: ${boardId}`,
          Errors.malformedBoardId,
          __dirname,
          __filename
        );
      // [2]
      const populatedBoard = (await BoardService.fetch({
        key: "_id",
        value: boardId,
      }).then(populateBoard)) as BoardPopulatedInterface;
      const existingLabel = populatedBoard.columns.find(
        (e) => e.label === label
      );
      if (existingLabel)
        throwError(
          `malformed label ${label}`,
          Errors.malformedLabel,
          __dirname,
          __filename
        );
      // [3]
      const column = new ColumnModel(columnBase);
      await column.save().then((column: ColumnInterface) =>
        // [4]
        addColumnRefToBoard(column, populatedBoard)
      );
    } catch (err) {
      console.log(err);
    }
    return;
  }
  /**
   * Edits `column` instance.
   * @param {Query} query - Query object.
   * @param {Query} replace - Query object.
   */
  async edit<K extends keyof ColumnInterface>(
    query: Query<ColumnInterface, K>,
    replace: Query<ColumnInterface, K>
  ): Promise<ColumnInterface> {
    /*flow
      1. fetch column
      2. replace
      3. save
    */
    try {
      // [1]
      const column = await this.fetch(query);
      if (!column) return;

      // [2]
      column[replace.key] = replace.value;
      column.markModified(replace.key);

      // [3]
      column.save();
      return column;
    } catch (err) {
      console.log(err);
    }
  }
  /**
   * Deletes `column` instance.
   * @param {Query} query - Query object.
   */
  async delete<K extends keyof ColumnInterface>(
    query: Query<ColumnInterface, K>
  ): Promise<ColumnInterface> {
    /*
      1. fetch
      2. validate column
      3. delete
    */
    try {
      // [1]
      const column = await this.fetch(query);
      // [2]
      if (!column) return;
      if (column && column.$isDeleted())
        throwError(
          "already deleted task",
          Errors.unknown,
          __dirname,
          __filename
        );
      // [3]
      return await column.deleteOne((_, deletedColumn) => deletedColumn);
    } catch (err) {
      console.log(err);
    }
  }
  /**
   * Fetches `column` instance by given query.
   * @param {Query} query - Query object.
   */
  async fetch<K extends keyof ColumnInterface>(
    query: Query<ColumnInterface, K>
  ): Promise<ColumnInterface> {
    /*
      1. get column
      2. validate
      3. return
    */
    try {
      const column = await ColumnModel.findOne(
        new QueryClass(query).transform()
      );
      if (!column)
        throwError(
          `Insufficient query: ${query}`,
          Errors.insufficientQuery,
          __dirname,
          __filename
        );

      return column;
    } catch (err) {
      console.log(err);
    }
  }
  /**
   * Populates `column` instance.
   * @param {Query} column - Query object.
   */
  async populate(column: ColumnInterface): Promise<ColumnPopulatedInterface> {
    /*
      1. populate
    */
    try {
      const populatedColumn = (await column
        .populate("tasks")
        .execPopulate()) as unknown;
      if (!populateBoard)
        throwError("Population failed", Errors.unknown, __dirname, __filename);
      return <ColumnPopulatedInterface>populatedColumn;
    } catch (err) {
      console.log(err);
    }
  }
}

const columnService = new ColumnService();
export default columnService;

//! Helpers

/**
 * Runs populate().execPopulate() on `board` instance.
 * @param {BoardInterface} board - `board` instance.
 */
async function populateBoard(
  board: BoardInterface
): Promise<BoardPopulatedInterface | BoardInterface> {
  return await board.populate("column").execPopulate();
}

/**
 * References column._id in board.columns.
 * @param {ColumnInterface} column - `column` instance.
 * @param {BoardPopulatedInterface} board - Corresponding `board` instance.
 */
async function addColumnRefToBoard(
  column: ColumnInterface,
  board: BoardPopulatedInterface
): Promise<void> {
  /* 
    TODO
    Can you push type ObjectId to populated array of references? Hope so.
  */
  board.columns.push(column._id);
  board.markModified("columns");
  board.save();
}