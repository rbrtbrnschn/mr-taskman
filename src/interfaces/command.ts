import Discord from "discord.js";

interface Command {
  name: string;
  description: string;
  aliases?: Array<string>;
  usage: string;
  execute(messgage: Discord.Message, args: Array<string>): void;
  guildOnly?: boolean;
  permissions?: string;
  args?: boolean;
  cooldown?: number;
  subcommand?: string;
  category?: string;
}

export default Command;
