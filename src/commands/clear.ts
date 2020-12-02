import Discord from "discord.js";
import config from "../config";

export default {
  name: "clear",
  description: "cleans channel from messages",
  usage: "<amount of messages>",
  args: false,
  guildOnly: true,
  execute: function (message: Discord.Message, args: Array<string>): void {
    const amount = parseInt(args[0]);
    if (args.length) {
      if (isNaN(amount)) {
        message.reply(config.messages.args());
        return;
      }
    }
    if (message.channel.type !== "dm")
      message.channel
        .bulkDelete(amount > 2 && amount <= 100 ? amount : 100)
        .catch((err) => {
          console.log("err", err);
        });
  },
};
