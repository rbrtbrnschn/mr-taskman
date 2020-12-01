import Discord from "discord.js";
import { getGuild } from "../common/guild/get";

export = async function onReaction(
  reaction: Discord.MessageReaction
): Promise<void> {
  // const messageId = reaction.message.id;
  const foundGuild = await getGuild(reaction.message);
  if (!foundGuild) throw new Error("no guild");

  const halfPopulatedGuild = await foundGuild.populate("tasks");
  const populated = await halfPopulatedGuild.execPopulate();
  if (!populated.tasks) return;
  // const { tasks } = populated;

  // const foundTask = tasks.find((t) => t.messageId === messageId);
  console.log(populated);

  // console.log(reaction);
};
