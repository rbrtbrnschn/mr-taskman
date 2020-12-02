import dotenv from "dotenv";
dotenv.config();

import DiscordManager from "./interfaces/Manager";
import loaders from "./loaders";

const manager = new DiscordManager();

const startBot = async () => {
  await loaders(manager);
}

startBot();

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});

export {manager};