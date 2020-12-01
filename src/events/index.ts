import onReady from "./onReady";
import onMessage from "./onMessage";
import onGuildCreate from "./onGuildCreate";
import onGuildDelete from "./onGuildDelete";
import onChannelDelete from "./onChannelDelete";

const all = {
  onGuildCreate: onGuildCreate,
  onGuildDelete: onGuildDelete,
  onMessage: onMessage,
  onReady: onReady,
  onChannelDelete: onChannelDelete,
  abc: "lol",
};
export = all;
