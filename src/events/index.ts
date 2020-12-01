import onReady from "./onReady";
import onMessage from "./onMessage";
import onGuildCreate from "./onGuildCreate";
import onGuildDelete from "./onGuildDelete";
import onReaction from "./onReaction";
import onChannelDelete from "./onChannelDelete";
import onRaw from "./onRaw";

const all = {
  onGuildCreate: onGuildCreate,
  onGuildDelete: onGuildDelete,
  onMessage: onMessage,
  onReady: onReady,
  onReaction: onReaction,
  onChannelDelete: onChannelDelete,
  onRaw: onRaw,
};
export = all;
