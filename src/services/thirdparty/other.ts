import { log } from "../../utils/loggers";
import ThirdpartyServiceInterface from "../../interfaces/thirdpartyService";

class GenericThirdpartyService implements ThirdpartyServiceInterface {
  async isGuildId(guildId: string): Promise<boolean> {
    log("[GENERIC THIRDPARTY SERVICE]: in use", "BRED");
    return true;
  }
}

export default GenericThirdpartyService;
