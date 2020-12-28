import mongoose from "mongoose";
import TaskModel, { TaskBase, TaskInterface } from "../models/task";
import GenericService from "./service";
import { GuildService, ColumnService } from ".";
import throwError from "../utils/errors";
import Errors from "../models/errors";
import { ColumnInterface } from "../models/column";
import Query from "../models/query";

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
   * @param {{key: keyof TaskBase, value: unknown}} query - Query object.
   */
  async edit<K extends keyof TaskInterface>(
    query: Query<TaskInterface, K>,
    replace: Query<TaskInterface, K>
  ): Promise<TaskInterface> {
    const { key, value } = query;
    /*
      1. Get task
      2. Edit
      3. Mark modified
      4. Save
    */
    try {
      const task = (await TaskModel.findOne({ [key]: value })) as TaskInterface;
      if (!task) {
        throwError(
          `Insufficient query: ${query}`,
          Errors.insufficientQuery,
          __dirname,
          __filename
        );
      }
      task[replace.value] = replace.value;

      task.markModified(replace.key);
      task.save();
      return task;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Deletes instance of `task`.
   * @param {{key: keyof TaskBase, value: unknown}} query - Query object.
   */
  async delete<K extends keyof TaskBase>(
    query: Query<TaskBase, K>
  ): Promise<TaskInterface> {
    const { key, value } = query;
    /*Flow
      1. get task
      1. delete task
      1. save
    */
    try {
      const task = await TaskModel.findOne({ [key]: value });
      if (!task.$isDeleted) console.log("TODO: not sure this works");

      return task.deleteOne((err, deletedTask) => deletedTask);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Fetches `task` instance.
   * @param {Query} query - Query object.
   */
  // Potential Overloading.
  async fetch<K extends keyof TaskBase>(
    query: Query<TaskBase, K>
  ): Promise<TaskInterface> {
    /*Flow
      1. get task
      2. validate
      3. return 
    */
    try {
      const { key, value } = query;
      const task = await TaskModel.findOne({ [key]: value });
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
}

const taskService = new TaskService();
export default taskService;

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
