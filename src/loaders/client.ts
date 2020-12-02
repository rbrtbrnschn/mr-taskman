import { Client } from "discord.js";
import handlers from "../handlers/client";

export default async (client: Client): Promise<void> => {
  Object.entries(
    handlers
  ).forEach(([eventType, eventHandler]: [string, (...args: any[]) => void]) =>
    client.on(eventType, eventHandler)
  );
  client.login();
};
