import {
  initTestingDatabase,
  cleanupTestingDatabase,
} from "../../src/utils/testHelpers";
import ColumnModel, { ColumnBase } from "../../src/models/column";

beforeAll(initTestingDatabase);
afterAll(cleanupTestingDatabase);

describe("column-model", () => {
  it("instantiate column", async () => {
    const base: ColumnBase = {
      boardId: "01",
      columnId: "02",
      guildId: "03",
      ownerId: "04",
    };

    const column = await new ColumnModel(base).save();
    const { boardId, columnId, guildId, ownerId } = column;

    expect(columnId).toBeTruthy();
    expect(guildId).toBeTruthy();
    expect(ownerId).toBeTruthy();
    expect(boardId).toBeTruthy();
  });
});
