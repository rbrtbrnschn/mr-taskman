import Discord from "discord.js";
import { manager } from "../index";
export = {
    name: "uptime",
    description: "shows uptime",
    usage: "",
    args: false,
    guildOnly: false,
    execute: function (message: Discord.Message, args: Array<string>): void {
        let title = "Pure Bliss";
        const uptimeInSecs = parseInt((manager.client.uptime / 1000).toFixed(0), 10);
        if (uptimeInSecs >= 31536000) title = "Old-Hound";
        else if (uptimeInSecs >= 15811200) title = "Semi-Oldtimer";
        else if (uptimeInSecs >= 7948800) title = "Quarterpounder";
        else if (uptimeInSecs >= 2678400) title = "1 Month Sober";
        else if (uptimeInSecs >= 604800) title = "Adolescent with eating disorder";
        else if (uptimeInSecs >= 172800) title = "Teenage Mutant Nija Turtle";
        else if (uptimeInSecs >= 86400) title = "Baby Bot";
        else if (uptimeInSecs >= 43200) title = "Newborn";
        else if (uptimeInSecs >= 3600) title = "Unborn Baby Bot";
        else if (uptimeInSecs >= 60) title = "Handicapped Unborn Baby";

        message.reply(`${uptimeInSecs} secs ~ ${title}`);
    }
};