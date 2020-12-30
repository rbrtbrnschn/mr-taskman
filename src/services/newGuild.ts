import Errors from "../models/errors";
import GuildModel, {
  GuildBase,
  GuildInterface,
  GuildPopulatedInterface,
} from "../models/guild";
import throwError from "../utils/errors";
import GenericService from "./service";
import Query, { QueryClass } from "../models/query";

/**
 * Service serving as interface between all things `board` and the backend.
 */
class GuildService extends GenericService {
  constructor() {
    super();
  }

  /**
   * Instantiates new `guild` instance.
   * @param {GuildBase} guildBase - necessary properties to instantiate new `guild` instance.
   */
  async create(guildBase: GuildBase) {
    /*flow
      1. validate
      2. create
    */
    try {
      // [1]
      const { ownerIdentifier, guildIdentifier } = guildBase;
      if (!ownerIdentifier || !guildIdentifier)
        throwError(
          "Missing property",
          Errors.missingProperty,
          __dirname,
          __filename
        );
      // [2]
      const guild = new GuildModel(guildBase);
      guild.save();
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Edits given `guild` instance.
   * @param {Query} query - Query object.
   * @param {Query} replace - Query object.
   */
  async edit<K extends keyof GuildInterface>(
    query: Query<GuildInterface, K>,
    replace: Query<GuildInterface, K>
  ): Promise<GuildInterface> {
    /*flow
      1. fetch
      2. edit
    */
    try {
      // [1]
      const guild = await this.fetch(query);
      if (!guild) return;

      // [2]
      guild[replace.key] = replace.value;
      guild.markModified(replace.key);
      guild.save();

      return guild;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Deletes given `guild` instance.
   * @param {Query} query - Query object.
   */
  async delete<K extends keyof GuildInterface>(
    query: Query<GuildInterface, K>
  ): Promise<GuildInterface> {
    /*flow
      1. fetch
      2. validate
      3. delete
    */
    try {
      // [1]
      const guild = await this.fetch(query);
      // [2]
      if (!guild) return;
      if (guild && guild.$isDeleted())
        throwError("Already deleted", Errors.unknown, __dirname, __filename);
      // [3]
      return await guild.deleteOne().then((guild) => guild);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Fetches given `guild` instance.
   * @param {Query} query - Query object.
   */
  async fetch<K extends keyof GuildInterface>(
    query: Query<GuildInterface, K>
  ): Promise<GuildInterface> {
    /*
      1. fetch
      2. validate
    */
    try {
      // [1]
      const guild = await GuildModel.findOne(new QueryClass(query).transform());
      // [2]
      if (!guild)
        throwError(
          `Insufficient query: ${query}`,
          Errors.insufficientQuery,
          __dirname,
          __filename
        );
      return guild;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Populates given `guild` instance.
   * @param {Query} query - Query object.
   */
  async populate<K extends keyof GuildInterface>(
    query: Query<GuildInterface, K>
  ): Promise<GuildPopulatedInterface> {
    /*flow
      1. fetch
      2. validate
      3. populate
    */
    try {
      const guild = await this.fetch(query);
      if (!guild) return;

      const populatedGuild = (await guild
        .populate("boards")
        .execPopulate()) as unknown;

      return <GuildPopulatedInterface>populatedGuild;
    } catch (err) {
      console.log(err);
    }
  }
}

const guildService = new GuildService();
export default guildService;

//! Helpers
