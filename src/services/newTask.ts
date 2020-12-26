import mongoose from "mongoose";
import TaskModel, { TaskBase, TaskInterface } from "../models/task";
import GenericService from "./service";
import GuildService from "./newGuild";
import ColumnService from "./newColumn";
import throwError from "../utils/errors";
import Errors from "../models/errors";
import { ColumnInterface } from "../models/column";

/**
 * Service serving as interface between all things task and the backend.
 */
export class TaskService extends GenericService {
  constructor(name: string) {
    super(name);
  }
  /**
   * Instantiates a new `Task`.
   */
  async create(taskbase: TaskBase): Promise<TaskInterface> {
    const { guildId, columns } = taskbase;
    /*Param Types
    guildId: mongoose.Types.ObjectId
    columns: Array<mongoose.Types.ObjectId>
    */
    /* Flow
      1. validate guildId => unique and existing within global scope
      2. validate columns[] was provided
      3. create new task
      4. reference task[4] in corresponding column if available.
    */
    try {
      const exisitingGuildId = await GuildService.isExisitingGuildId(guildId);
      const nextTaskIdentifier = await GuildService.getNextTaskId(guildId);
      // [1]
      if (!exisitingGuildId)
        throwError(
          `Invalid guildId: ${guildId}`,
          Errors.malformedGuildId,
          __dirname,
          __filename
        );
      // [2]
      if (!columns) {
        /*
          TODO
          Add proper validation
        */
        throwError(
          `Invalid columns: ${columns}`,
          Errors.missingProperty,
          __dirname,
          __filename
        );
      }
      // [3]
      const task = new TaskModel({
        ...taskbase,
        taskIdentifier: nextTaskIdentifier,
      });
      return task.save().then(async (docs: TaskInterface) => {
        // [4]
        const { columns: _columns } = docs;
        _columns.forEach((columnId) => addTaskRefToColumn(columnId, task._id));
        return docs;
      });
    } catch (err) {
      console.log(err);
    }
  }
}

//* Helpers
async function addTaskRefToColumn(
  columnId: mongoose.Schema.Types.ObjectId,
  taskId: mongoose.Schema.Types.ObjectId
) {
  const column = (await ColumnService.fetch({
    query: { key: "columnId", value: columnId },
  })) as ColumnInterface;
  column.tasks.push(taskId);
  column.markModified("tasks");
  column.save();
}
