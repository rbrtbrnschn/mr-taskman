import onReady from "./onReady";
import onMessage from "./onMessage";
import onGuildDelete from "./onGuildDelete";
import GuildService from "../../services/guild";

export default {
  ready: onReady,
  message: onMessage,
  guildCreate: GuildService.create,
  guildDelete: onGuildDelete,
  channelDelete: GuildService.removeChannel,
};
