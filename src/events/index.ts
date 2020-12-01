import onReady from "./onReady";
import onMessage from "./onMessage";
import onGuildCreate from "./onGuildCreate";
import onGuildDelete from "./onGuildDelete";
import onReaction from "./onReaction";

const all = {
  onGuildCreate: onGuildCreate,
  onGuildDelete: onGuildDelete,
  onMessage: onMessage,
  onReady: onReady,
  onReaction: onReaction,
};
export = all;
