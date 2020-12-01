import dotenv from "dotenv";
dotenv.config();
import {
  onReady,
  onMessage,
  onGuildCreate,
  onGuildDelete,
  onReaction,
  onChannelDelete,
  onRaw,
} from "./events/index";
import propagate from "./common/propagate";
import DiscordManager from "./interfaces/Manager";
import "./database/index";

const manager = new DiscordManager();
propagate();

const { client } = manager;
client.on("ready", onReady);
client.on("message", onMessage);
client.on("guildCreate", onGuildCreate);
client.on("guildDelete", onGuildDelete);
client.on("messageReactionAdd", onReaction);
client.on("channelDelete", onChannelDelete);
client.on("raw", onRaw);

client.login();
export { manager };

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});
