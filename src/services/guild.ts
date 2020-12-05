import chalk from "chalk";
import Discord from "discord.js";
import GuildModel, { GuildInterface } from "../models/guild";

class GuildService {
  async create(message: Discord.Message): Promise<void>;
  async create(guild: Discord.Guild): Promise<void>;
  async create(param: unknown): Promise<void> {
    let guild;
    if (param instanceof Discord.Message) {
      guild = param.guild;
    } else if (param instanceof Discord.Guild) {
      guild = param;
    }
    const guildModel = new GuildModel({
      guildId: guild.id,
      ownerId: guild.ownerID,
      roles: {
        admin: "",
        moderator: "",
      },
      tasks: [],
      channelIds: [],
      selectedTasks: {},
    });
    console.log(
      `${chalk.magenta.bold("[DISCORD]:")} ${chalk.reset()}\`${
        guild.name
      }\` joined.`
    );
    await guildModel.save();
  }

  async fetch(message: Discord.Message): Promise<GuildInterface>;
  async fetch(guild: Discord.Guild): Promise<GuildInterface>;
  async fetch(id: string): Promise<GuildInterface>;
  async fetch(param: unknown): Promise<GuildInterface> {
    let guildId;
    if (param instanceof Discord.Message) {
      guildId = param.guild.id;
    } else if (param instanceof Discord.Guild) {
      guildId = param.id;
    } else if (typeof param === "string") {
      guildId = param;
    }
    const foundGuild = await GuildModel.findOne({ guildId });

    if (!foundGuild) return;
    else return foundGuild;
  }

  // Task management

  async getNextTaskId(guild: Discord.Guild): Promise<string> {
    const foundGuild = await this.fetch(guild);
    const newId = ("" + (foundGuild.nextTaskId || 0)).padStart(4, "0");
    foundGuild.nextTaskId = foundGuild.nextTaskId % 10000; // Breaks at 10000 tasks if there is overlap
    foundGuild.markModified("nextTaskId");
    foundGuild.save();
    return newId;
  }

  // Channel management

  async removeChannel(channel: Discord.Channel): Promise<void> {
    const foundGuild = await GuildModel.findOne({
      channelIds: { $elemMatch: { $eq: channel.id } },
    });
    if (foundGuild) {
      foundGuild.channelIds = foundGuild.channelIds.filter(
        (id) => id !== channel.id
      );
      foundGuild.markModified("channelIds");
      await foundGuild.save();
    }
  }

  // Validation

  validateChannelIds(message: Discord.Message, channelIds: string[]): boolean {
    if (!channelIds.length) return false;
    const channels = channelIds.map((id) =>
      message.guild.channels.cache.get(id)
    );
    const hasAllChannels = channels.every(
      (c) => c instanceof Discord.TextChannel
    );
    return hasAllChannels;
  }

  validateRoles(
    message: Discord.Message,
    roles: Record<string, string>
  ): boolean {
    const rolesValues = Object.values(roles);
    const mappedArray = rolesValues.map((r) => {
      const role = message.guild.roles.cache.get(r);
      return role ? true : false;
    });
    const hasRoles = mappedArray.every((expression) => expression);
    if (!hasRoles) return false;
    return true;
  }

  isGuildSetup(message: Discord.Message, guild: GuildInterface): boolean {
    const isAllowed = [];
    isAllowed.push(this.validateChannelIds(message, guild.channelIds));
    isAllowed.push(this.validateRoles(message, guild.roles));
    if (isAllowed.some((v) => !v)) return false;
    return true;
  }
}

export default new GuildService();
