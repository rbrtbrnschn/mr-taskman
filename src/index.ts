import Discord from "discord.js";
import dotenv from "dotenv";
import { onReady, onMessage, onGuildCreate, onGuildDelete } from "./events/index";
dotenv.config();

const client = new Discord.Client();
export { client };

client.on("ready", onReady);
client.on("message", onMessage);
client.on("guildCreate", onGuildCreate);
client.on("guildDelete", onGuildDelete);

client.login(process.env.DISCORD_BOT_TOKEN);

