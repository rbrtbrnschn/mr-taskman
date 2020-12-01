import Discord from "discord.js";
import config, { getErrorMessage, messages } from "../config";
export = {
  name: "error",
  description: "shows error message for given error code",
  usage: "<error code>",
  args: true,
  guildOnly: false,
  execute: function (message: Discord.Message, args: Array<string>): void {
    // Get Error
    const code = args[0].toLowerCase();
    const errorCode = getErrorMessage(code);

    // Validate No Error
    if (!errorCode) {
      message.reply(messages.args());
      return;
    }

    const embed = new Discord.MessageEmbed()
      .setColor(config.colors.primary)
      .setTitle(errorCode.code)
      .setDescription(errorCode.msg);

    // Reply
    message.reply(embed);
  },
};
