import { Channel } from "discord.js";
import GuildModel from "../../models/guild";

export default async function (channel: Channel) {
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
