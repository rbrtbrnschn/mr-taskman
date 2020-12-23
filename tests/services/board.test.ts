import BoardModel, { BoardBase } from "../../src/models/board";
import BoardService from "../../src/services/board";

describe("board-service", () => {
  it("board-create", async () => {
    const base: BoardBase = {
      boardId: "01",
      guildId: "02",
      columns: [],
      ownerId: "03",
    };
    const board = await BoardService.create(base);

    expect(board).toBeInstanceOf(BoardModel);
  });
});
