import onReady from "./onReady";
import onMessage from "./onMessage";
import onGuildCreate from "./onGuildCreate";
import onGuildDelete from "./onGuildDelete";

const all = {
    onGuildCreate: onGuildCreate,
    onGuildDelete: onGuildDelete,
    onMessage: onMessage,
    onReady: onReady,
    abc: "lol"
};
export = all; 
