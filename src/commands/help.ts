import Discord from "discord.js";
import { manager } from "../index";
import { prefix, bot, reactions, colors } from "../config";
export = {
    name: "help",
    description: "List's Commands & Helpfull Information",
    usage: "<command name>",
    guildOnly: false,
    cooldown: 5,
    aliases: ["welp"],
    execute: function (message: Discord.Message, args: Array<string>): void {
        const perPage = 5;
        const page = !isNaN(parseInt(args[0], 10)) ? parseInt(args[0]) : 1;
        // Get SubMethod
        const isSpecific = args.length ? true : false;
        const isPage = args.length === 1 && !isNaN(page);

        // List General Information
        const embed = new Discord.MessageEmbed();
        embed.setFooter(`${bot.name} ~ V${bot.version} ~ Page ${page}`);
        embed.setColor(colors.primary);

        // General Help
        if (!isSpecific) {
            embed.setTitle("List of available commands");
            embed.setAuthor(`${prefix}${this.name}`);

            // Add Commands
            manager.commands.forEach((cmd) => {
                const { name, description } = cmd;
                embed.addField(`> ${name}`, description);
            });
        }
        // Command Specific Information
        else {
            // TODO CHECK FOR SUBCOMMANDS
            const cmd = manager.commands.get(args[0]);
            if (!cmd) { message.react(reactions.bad); return; }

            embed.setTitle(`${cmd.name}-specific information`);
            embed.setAuthor(`${prefix}${cmd.name}`);

            if (cmd.subcommand && cmd.subcommand.length) {
                const subcmds = manager.commands.filter((subcmd) => subcmd.category === cmd.subcommand);
                embed.addField("> Subcommands:", "\u200b");
                subcmds.forEach((subcmd): void => {
                    const { name, description, usage } = subcmd;
                    embed.addField(`> ${name}`, `Description: ${description}\nUsage: ${prefix}${subcmd.name} ${usage}`);
                });
            }
            else {
                // Remove Default & Execute
                const entries = Object.entries(cmd);
                entries.splice(entries.length - 2, 2);

                entries.forEach((e): void => {
                    const key = e[0];
                    let value = e[1];

                    if (key === "usage") value = `${prefix}${cmd.name} ${value}`;

                    embed.addField(`> ${key}`, value);
                });
            }

        }
        // Send
        message.author.send(embed);
    },
};

