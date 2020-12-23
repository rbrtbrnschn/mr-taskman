import ColumnModel, {
  ColumnBase,
  ColumnInterface,
} from "../../src/models/column";
import ColumnService from "../../src/services/column";

//! Helpers
async function getTestingColumn(): Promise<ColumnInterface> {
  const base: ColumnBase = {
    boardId: "01",
    columnId: "02",
    guildId: "03",
    ownerId: "04",
  };
  const column = (await ColumnService.create(base)) as ColumnInterface;
  return column;
}

describe("column-service", () => {
  it("ColumnService.create", async () => {
    const column = await getTestingColumn();
    expect(column).toBeInstanceOf(ColumnModel);
  });

  it("ColumnService.edit", async () => {
    expect(0).toEqual(0);
  });
});
