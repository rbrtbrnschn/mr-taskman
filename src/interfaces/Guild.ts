import Discord from "discord.js";

export default class Guild {
  ownerId: string;
  guildId: string;
  channelId: string;
  roles: Record<string, unknown>;
  tasks: Array<Record<string, unknown>>;

  constructor(message: Discord.Message) {
    this.guildId = message.guild.id;
    this.ownerId = message.guild.ownerID;
    this.roles = {
      admin: "",
      moderator: "",
    };
    this.tasks = [];
  }
}
