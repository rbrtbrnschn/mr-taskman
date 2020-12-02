import Discord from "discord.js";
import config from "../config";

export default {
  name: "error",
  description: "shows error message for given error code",
  usage: "<error code>",
  args: true,
  guildOnly: false,
  execute: function (
    message: Discord.Message,
    args: Array<string>
  ): Promise<Discord.Message> {
    // Get Error
    if (args[0] === undefined) return message.reply(config.messages.args());
    const code = args[0].toLowerCase();
    const errorCode = config.getErrorMessage(code);

    // Validate No Error
    if (!errorCode) {
      message.reply(config.messages.args());
      return;
    }

    const embed = new Discord.MessageEmbed()
      .setColor(config.colors.primary)
      .setTitle(errorCode.code)
      .setDescription(errorCode.msg);

    // Reply
    return message.reply(embed);
  },
};
