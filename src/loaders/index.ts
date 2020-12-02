import DiscordManager from "../interfaces/Manager";

import clientLoader from "./client";
import mongooseLoader from "./mongoose";
import commandsLoader from "./commands";

export default async (manager: DiscordManager): Promise<void> => {
  await commandsLoader(manager.commands);
  await clientLoader(manager.client);
  await mongooseLoader();
};
