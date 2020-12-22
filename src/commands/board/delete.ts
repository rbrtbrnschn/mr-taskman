import Discord from "discord.js";
import config from "../../config";
import BoardService from "../../services/board";

export default {
  name: "bdelete",
  description: "create new board",
  usage: "<a>",
  args: true,
  guildOnly: true,
  category: "board",
  execute: async function (
    message: Discord.Message,
    args: Array<string>
  ): Promise<void> {
    try {
      const boardId = args[0];
      console.log(boardId);
      BoardService.delete(boardId);

      message.react(config.reactions.good());
    } catch (err) {
      console.log(err);
      message.react(config.reactions.error());
    }
    return;
  },
};
