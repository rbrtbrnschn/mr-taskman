import Discord from "discord.js";
import config from "../../config";
import ColumnService from "../../services/column";
import { ColumnBase } from "../../models/column";

export default {
  name: "cfetch",
  description: "fetch column by label",
  usage: "<a>",
  args: true,
  guildOnly: true,
  category: "column",
  execute: async function (
    message: Discord.Message,
    args: Array<string>
  ): Promise<void> {
    try {
      const label = args[0];

      const column = await ColumnService.fetch2({
        query: { key: "label" as keyof ColumnBase, value: label },
      });
      console.log(column);
      if (!column) throw {};

      message.react(config.reactions.good());
    } catch (err) {
      console.log(err);
      message.react(config.reactions.error());
    }
  },
};
