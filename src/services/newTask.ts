import mongoose from "mongoose";
import TaskModel, {
  TaskBase,
  TaskInterface,
  TaskPopulatedInterface,
} from "../models/task";
import GenericService from "./service";
import { GuildService, ColumnService } from ".";
import throwError from "../utils/errors";
import Errors from "../models/errors";
import { ColumnInterface } from "../models/column";
import Query, { QueryClass } from "../models/query";

/**
 * Service serving as interface between all things task and the backend.
 */
export class TaskService extends GenericService {
  /**
   *
   */
  constructor() {
    super();
  }

  /**
   * Instantiates a new `Task`.
   * @param {TaskBase} taskbase - Necessary fields to instatiate new `task` instance.
   */
  async create(taskbase: TaskBase): Promise<TaskInterface> {
    const { guildId, columns } = taskbase;
    /*Param Types
    guildId: mongoose.Types.ObjectId
    columns: Array<mongoose.Types.ObjectId>
    */
    /* Flow
      1. validate guildId => unique and existing within global scope
      2. validate columns[]
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

  /**
   * Edit's a `task` instance.
   * @param {Query} query - Query object.
   */
  async edit<K extends keyof TaskInterface>(
    query: Query<TaskInterface, K>,
    replace: Query<TaskInterface, K>
  ): Promise<TaskInterface> {
    /*
      1. Get task
      2. Edit
      3. Save
    */
    try {
      // [1]
      const task = await this.fetch(query);
      if (!task) return;

      // [2]
      task[replace.value] = replace.value;
      // [3]
      task.markModified(replace.key);
      task.save();
      return task;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Deletes instance of `task`.
   * @param {Query} query - Query object.
   */
  async delete<K extends keyof TaskInterface>(
    query: Query<TaskInterface, K>
  ): Promise<TaskInterface> {
    /*Flow
      1. get task
      1. delete task
      1. save
    */
    try {
      const task = await this.fetch(query);
      if (!task) return;
      if (task && task.$isDeleted())
        throwError("non existant task", Errors.unknown, __dirname, __filename);

      return await task.deleteOne((_, deletedTask) => deletedTask);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Fetches `task` instance.
   * @param {Query} query - Query object.
   */
  // Potential Overloading.
  async fetch<K extends keyof TaskInterface>(
    query: Query<TaskInterface, K>
  ): Promise<TaskInterface> {
    /*Flow
      1. get task
      2. validate
      3. return 
    */
    try {
      const task = await TaskModel.findOne(new QueryClass(query).transform());
      if (!task)
        throwError(
          `Insufficient query: ${query}`,
          Errors.insufficientQuery,
          __dirname,
          __filename
        );
      return task;
    } catch (err) {
      console.log(err);
    }
  }

  async populate(task: TaskInterface): Promise<TaskPopulatedInterface> {
    try {
      const populatedTask = (await task
        .populate("columns")
        .execPopulate()) as unknown;
      if (!populatedTask)
        throwError("Population failed", Errors.unknown, __dirname, __filename);

      return <TaskPopulatedInterface>populatedTask;
    } catch (err) {
      console.log(err);
    }
  }
}

const taskService = new TaskService();
export default taskService;

//* Helpers
async function addTaskRefToColumn(
  columnId: mongoose.Schema.Types.ObjectId,
  taskId: mongoose.Schema.Types.ObjectId
) {
  const column = (await ColumnService.fetch({
    key: "_id",
    value: columnId,
  })) as ColumnInterface;
  column.tasks.push(taskId);
  column.markModified("tasks");
  column.save();
}
