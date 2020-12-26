import { TaskBase } from "../models/task";
import GenericService from "./service";

/**
 * Service serving as interface between all things task and the backend.
 */
export class TaskService extends GenericService {
  constructor(name: string) {
    super(name);
  }
  /**
   * Creates a new Task.
   */
  async create(taskbase: TaskBase, cb?: () => unknown): Promise<void> {
    //
  }
}
