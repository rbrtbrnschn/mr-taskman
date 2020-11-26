import Discord from "discord.js";
import { manager } from "../index";
import { prefix, bot } from "../config";
export = {
    name: "help",
    description: "List's Commands & Helpfull Information",
    usage: "<commands name>",
    guildOnly: true,
    cooldown: 5,
    aliases: ["welp"],
    execute: function (message: Discord.Message): void {
        // List General Information
        const embed = new Discord.MessageEmbed();
        embed.setTitle("List of available commands");
        embed.setAuthor(`${prefix}${this.name}`);
        embed.setFooter(`${bot.name} ~ ${bot.version}`);

        // Add Commands
        manager.commands.forEach((cmd) => {
            const { name, description } = cmd;
            embed.addField(`> ${name}`, description);
        });

        // Send
        message.author.send(embed);
    },
};

