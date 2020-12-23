import {
  initTestingDatabase,
  cleanupTestingDatabase,
} from "../../src/utils/testHelpers";
import BoardModel, { BoardBase } from "../../src/models/board";

beforeAll(initTestingDatabase);
afterAll(cleanupTestingDatabase);

const base: BoardBase = { boardId: "01", guildId: "02", ownerId: "03" };

describe("board-model", () => {
  it("instantiate board", async () => {
    const board = await new BoardModel(base).save();

    expect(board.boardId).toBeTruthy();
    expect(board.guildId).toBeTruthy();
    expect(board.ownerId).toBeTruthy();
  });
});
