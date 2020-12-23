import {
  initTestingDatabase,
  cleanupTestingDatabase,
} from "../../src/utils/testHelpers";
import TaskModel, { TaskBase } from "../../src/models/task";

beforeAll(initTestingDatabase);
afterAll(cleanupTestingDatabase);

describe("task-model", () => {
  it("instantiate task", async () => {
    const base: TaskBase = {
      title: "title",
      participants: ["participant"],
      deadline: new Date(),
      taskId: "01",
      guildId: "01",
      columnId: "02",
      columns: [],
    };
    const task = await new TaskModel(base).save();

    const {
      title,
      description,
      participants,
      deadline,
      taskId,
      messageIds,
      guildId,
      columnId,
      columns,
      completed,
      createdTimestamp,
      wip,
    } = task;

    expect(title).toBeTruthy();
    expect(description).toBeDefined();
    expect(participants).toHaveLength(1);
    expect(deadline).toBeInstanceOf(Date);
    expect(taskId).toBeTruthy();
    expect(messageIds).toBeDefined();
    expect(guildId).toBeTruthy();
    expect(columnId).toBeTruthy();
    expect(completed).toBeDefined();
    expect(createdTimestamp).toBeDefined();
    expect(wip).toBeDefined();
    expect(columns).toBeDefined();
  });
});
