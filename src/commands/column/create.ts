import Discord from "discord.js";
import config from "../../config";
import ColumnService from "../../services/column";

export default {
  name: "ccreate",
  description: "create new board",
  usage: "<a>",
  args: true,
  guildOnly: true,
  category: "column",
  execute: function (message: Discord.Message, args: Array<string>): void {
    try {
      const boardId = args[0];
      const label = args[2];
      const columnId = args[1];

      ColumnService.create({
        label,
        boardId,
        columnId,
        guildId: message.guild.id,
        ownerId: message.author.id,
      });

      message.react(config.reactions.good());
    } catch (err) {
      console.log(err);
      message.react(config.reactions.error());
    }
  },
};
