import Discord from "discord.js";
import config from "../../config";
import { BoardBase, BoardInterface } from "../../models/board";
import BoardService from "../../services/board";

export default {
  name: "bedit",
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
      const key = args[1] as keyof BoardBase;
      const value = args[2];

      const board = (await BoardService.fetch(boardId)) as BoardInterface;
      BoardService.edit(board, key, value);

      message.react(config.reactions.good());
    } catch (err) {
      console.log(err);
      message.react(config.reactions.error());
    }
    return;
  },
};
