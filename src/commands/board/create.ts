import Discord from "discord.js";
import config from "../../config";
import BoardService from "../../services/board";

export default {
  name: "bcreate",
  description: "create new board",
  usage: "<a>",
  args: true,
  guildOnly: true,
  category: "board",
  execute: function (message: Discord.Message, args: Array<string>): void {
    try {
      const label = args[0];
      const boardId = args[1];
      BoardService.create({
        columns: [],
        label,
        boardId,
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
