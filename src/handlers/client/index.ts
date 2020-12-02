import onReady from "./onReady";
import onMessage from "./onMessage";
import onGuildCreate from "./onGuildCreate";
import onGuildDelete from "./onGuildDelete";
import onChannelDelete from "./onChannelDelete";

export default {
  ready: onReady,
  message: onMessage,
  guildCreate: onGuildCreate,
  guildDelete: onGuildDelete,
  channelDelete: onChannelDelete,
};
