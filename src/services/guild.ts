import Discord from "discord.js";
import GuildModel, {GuildInterface} from "../models/guild";

class GuildService {

  constructor(){
  }

  async create(message: Discord.Message): Promise<void>;
  async create(guild: Discord.Guild): Promise<void>;
  async create(param: any): Promise<void> {
    let guild;
    if(param instanceof Discord.Message){
      guild = param.guild;
    } else if (param instanceof Discord.Guild){
      guild = param;
    }
    try {
      const guildModel = await new GuildModel({
        guildId: guild.id,
        ownerId: guild.ownerID,
        roles: {
          'admin': '',
          'moderator': ''
        },
        tasks: [],
        channelIds: [],
      });
      await guildModel.save();
    } catch (error) {
      throw error;
    }
  }
  
  async fetch(message: Discord.Message): Promise<GuildInterface>;
  async fetch(guild: Discord.Guild): Promise<GuildInterface>;
  async fetch(id: string): Promise<GuildInterface>;
  async fetch(param: any): Promise<GuildInterface> {
    let guildId;
    if(param instanceof Discord.Message){
      guildId = param.guild.id;
    } else if (param instanceof Discord.Guild){
      guildId = param.id;
    } else if (typeof param === 'string'){
      guildId = param;
    }
    const foundGuild = await GuildModel.findOne({ guildId });

    if (!foundGuild) return;
    else return foundGuild;
  }

  validateChannelIds(
    message: Discord.Message,
    channelIds: string[]
  ): boolean {
    const channels = channelIds.map((id) => message.guild.channels.cache.get(id));
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

  isGuildSetup(
    message: Discord.Message,
    guild: GuildInterface
  ): boolean {
    const isAllowed = [];
    isAllowed.push(this.validateChannelIds(message, guild.channelIds));
    isAllowed.push(this.validateRoles(message, guild.roles));
    if (isAllowed.some((v) => !v)) return false;
    return true;
  }


}

export default new GuildService();