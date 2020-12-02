import Discord from "discord.js";
// import TaskService from "../../services/task";
// import GuildService from "../../services/guild";
import config from "../../config";

export = {
  name: "desc",
  description: "sets description",
  usage: "<desc>",
  args: true,
  guildOnly: true,
  category: "task",
  execute: async function (
    message: Discord.Message,
    args: Array<string>
  ): Promise<void> {
    // const foundGuild = await GuildService.fetch(message);
    // const selectedTask = TaskService.getSelectedTask(message, foundGuild);
    if (!args.length) {
      message.reply(config.messages.args());
      return;
    }
    let selectedTask; // For keeping validation from erroring during boilerplate setup. Please remove this line once finished.
    if (!selectedTask) {
      message.reply(config.messages.taskSelected());
      return;
    }
    // selectedTask.description = args.join(" ");
    // selectedTask.markModified("description");
    // TaskService.save(selectedTask);

    // TODO Possibly react to message upon completion, example below
    // TODO will setup ReactionGenerator from MessageGenerator in config
    // TODO following example will take a random selection of the list of reactions.good and react to the message with it
    // message.react(config.reactions.good())
  },
};
