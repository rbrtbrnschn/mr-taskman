import GenericThirdpartyService from "./other";

class DiscordService extends GenericThirdpartyService {
  async isGuildId(guildId: string): Promise<boolean> {
    return true;
  }
}

export default DiscordService;
