import {
  initTestingDatabase,
  cleanupTestingDatabase,
} from "../../src/utils/testHelpers";
import GuildModel, { GuildBase } from "../../src/models/guild";

beforeAll(initTestingDatabase);
afterAll(cleanupTestingDatabase);

describe("guild-model", () => {
  it("instantiate guild", async () => {
    const base: GuildBase = {
      guildId: "02",
      ownerId: "03",
      roles: { admin: "", moderator: "" },
      channelIds: [],
      boards: [],
      nextTaskId: 0,
    };
    const guild = await new GuildModel(base).save();

    expect(guild.guildId).toBeTruthy();
    expect(guild.ownerId).toBeTruthy();
    expect(guild.roles).toBe(base.roles);
    expect(JSON.stringify(guild.channelIds)).toEqual(
      JSON.stringify(base.channelIds)
    );
    expect(JSON.stringify(guild.boards)).toEqual(JSON.stringify(base.boards));
    expect(guild.nextTaskId).toEqual(0);
  });
});
