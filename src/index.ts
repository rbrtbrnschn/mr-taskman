import dotenv from "dotenv";
dotenv.config();
import { onReady, onMessage, onGuildCreate, onGuildDelete } from "./events/index";
import propegate from "./common/propegate";
import DiscordManager from "./interfaces/Manager";

const manager = new DiscordManager();
propegate();


const { client } = manager;
client.on("ready", onReady);
client.on("message", onMessage);
client.on("guildCreate", onGuildCreate);
client.on("guildDelete", onGuildDelete);

client.login(process.env.DISCORD_BOT_TOKEN);
export { manager };


