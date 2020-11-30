import Discord from "discord.js";
import { Schema } from "mongoose";

export default class Guild {
  ownerId: string;
  guildId: string;
  channelId: string;
  roles: Record<string, string>;
  tasks: Array<Schema.Types.ObjectId>;

  constructor(message: Discord.Message) {
    this.guildId = message.guild.id;
    this.ownerId = message.guild.ownerID;
    this.roles = Array.from(message.guild.roles.cache.values()).reduce(
      (prev, curr) => {
        return { ...prev, [curr.name]: curr.id };
      },
      {}
    );
    this.tasks = [];
  }
}
