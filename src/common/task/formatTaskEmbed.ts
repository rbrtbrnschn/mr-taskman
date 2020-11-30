import Discord from "discord.js";
import { TaskInterface } from "../../database/schemas";
import { taskColors } from "../../config";

function formatTaskEmbed(
  message: Discord.Message,
  task: TaskInterface
): Discord.MessageEmbed {
  const participants = task.participants.map((p) => {
    return message.guild.members.cache.get(p);
  });
  const embed = new Discord.MessageEmbed()
    .setAuthor(
      message.guild.members.cache.get(message.author.id).nickname ||
        message.author.username
    )
    .setColor(taskColors.created)
    .setTimestamp()
    .setTitle(task.title)
    .addField("> Description:", task.description || "\u200b")
    .addField("> Participants:", participants.join(","))
    .addField(
      (task.deadline && "> Deadline:") || "\u200b",
      (task.deadline && task.deadline.toLocaleString()) || "\u200b"
    )
    .setFooter(`Id: #${task.taskId}`);
  return embed;
}

export { formatTaskEmbed };
