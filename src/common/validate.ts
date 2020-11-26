import Discord from "discord.js";
import Command from "../interfaces/command";
import { manager } from "../index";
import { messages } from "../config";

function validate(message: Discord.Message, command: Command, argsArray: Array<string>): boolean {
    const { args, guildOnly, permissions } = command;

    // Cooldowns
    const { cooldowns } = manager;
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            message.reply(`${messages.cooldown()}\nPlease wait ${timeLeft.toFixed(2)} more second(s)`);
            return;
        }
    }
    timestamps.set(message.author.id, now);

    // Validate Given Args, Channel Type & Permission
    let replyMessage = "";
    if (args && !argsArray.length) replyMessage = `Missing Arguments\n${command.usage && command.usage}`;
    else if (guildOnly && message.channel.type === "dm") replyMessage = messages.channel();
    else if (permissions) {
        const usersHighest = message.guild.members.cache.get(message.author.id).roles.highest;
        const neededRole = message.guild.roles.cache.find((r) => r.name === permissions);
        if (usersHighest.position < neededRole.position) replyMessage = `${messages.permission()}\nYou are not a <@&${neededRole.id}>.`;
    }

    if (replyMessage.length) {
        message.reply(replyMessage);
        return false;
    }
    return true;
}

export = validate;