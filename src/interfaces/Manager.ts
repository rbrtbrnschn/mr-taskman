import Discord from "discord.js";
import Command from "./command";

class DiscordManager {
    client: Discord.Client;
    commands?: Discord.Collection<string, Command>;
    cooldowns?: Discord.Collection<string, Discord.Collection<string, number>>;
    devDatabase?: any;
    constructor() {
        this.client = new Discord.Client();
        this.commands = new Discord.Collection();
        this.cooldowns = new Discord.Collection();
        this.devDatabase = {};
    }
}
export = DiscordManager;