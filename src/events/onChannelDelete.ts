import { Channel } from "discord.js";
import { GuildModel } from "../database/schemas";

export default async function (channel: Channel): Promise<void> {
  const foundGuild = await GuildModel.findOne({
    channelIds: { $elemMatch: { $eq: channel.id } },
  });
  if (foundGuild) {
    foundGuild.channelIds = foundGuild.channelIds.filter(
      (id) => id !== channel.id
    );
    foundGuild.markModified("channelIds");
    await foundGuild.save();
  }
}
