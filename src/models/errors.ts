/**
 * @enum {number}
 */
export enum Errors {
  // Guild
  malformedGuildId,
  exisitingGuildId,
  // Board
  malformedBoardId,
  exisitingBoardId,
  // Column
  malformedColumnId,
  exisitingColumnId,
  // Task
  malformedTaskId,
  exisitingTaskId,
  // Properties
  missingProperty,
  insufficientQuery,
}

export default Errors;
