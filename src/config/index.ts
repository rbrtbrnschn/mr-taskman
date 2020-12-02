import { MessageEmbed } from "discord.js";
import reactionsData from "../data/reactions";
import messagesData from "../data/messages";
import Config, { ReactionKey } from "../interfaces/Config";
import { ErrorKey } from "../interfaces/ErrorCodes";

const { NODE_ENV } = process.env;
const isProd = NODE_ENV === "production";

const createMessageGenerator = (
  key: ErrorKey,
  config: Config
): (() => MessageEmbed) => {
  const messageArray: string[] = messagesData[key];
  const embed = new MessageEmbed();
  return (): MessageEmbed => {
    const randomIndex: number = Math.floor(Math.random() * messageArray.length);
    const errorCode = config.getErrorCode(key).code;
    embed.setColor(config.colors.primary);
    embed.setTitle(messageArray[randomIndex]);
    embed.setAuthor(errorCode);
    embed.setFooter(
      `Do \`${config.prefix}error ${errorCode}\` for more information.`
    );
    return embed;
  };
};

const createReactionGenerator = (
  key: ReactionKey,
  config: Config
): (() => string) => {
  const reactionArray: string[] = reactionsData[key];
  return (): string => {
    const randomIndex: number = Math.floor(
      Math.random() * reactionArray.length
    );
    return reactionArray[randomIndex];
  };
};

const config: Config = {
  prefix: isProd ? "/" : "!",
  mongo: {
    user: process.env.MONGODB_USER || "dev",
    pass: process.env.MONGODB_PASS || "C0p5FqNEA5nV8UG7",
    host: process.env.MONGODB_HOST || "cluster0.eit8m.mongodb.net",
    db: isProd ? "main" : "dev",
  },
  bot: {
    name: "Mr.Taskman",
    version: "2.0.0",
    isProd: isProd,
    path2Commands: isProd
      ? process.env.PATH2COMMANDS_PROD
      : process.env.PATH2COMMANDS_DEV,
  },
  colors: {
    primary: 0xfbdb48,
    secondary: 0x296d98,
  },
  taskColors: {
    created: "#ff0000",
    wip: "ffff00",
    completed: "00ff00",
  },
  reactions: null,
  messages: null,
  errorCodes: {
    cooldown: {
      code: "E00100",
      msg: "Cooldown is still active. Just wait a few seconds.",
    },
    permission: {
      code: "E00200",
      msg: "Unauthorized Access. You are not allowed to do this.",
    },
    channel: {
      code: "E00300",
      msg: "Wrong channel. Some commands cannot be performed in dms.",
    },
    args: {
      code: "E00400",
      msg: "Missing arguments. Command requires arguments.",
    },
    command: {
      code: "E00500",
      msg: "Command not found.",
    },
    error: {
      code: "E00600",
      msg: "The bot errored. The developer team has been notified.",
    },
    todo: {
      code: "E00700",
      msg: "This command is still a WIP.",
    },
    missingGuild: {
      code: "E00800",
      msg:
        "Your discord server cannot be found in our database.\nKick me and reinviting me to the server usually works.",
    },
    guildNotSetup: {
      code: "E00900",
      msg:
        "Your guild is not setup properly. You may want to talk to an adminstrator about this.\nIf you are the administrator, take look at the `guild status` or `help guild` command.",
    },
    taskSelected: {
      code: "E01000",
      msg:
        "No task selected. Take a look at our `task select` function.\nKeep in mind, we automatically deselect a task if you complete it.",
    },
  },
  getErrorCode(key) {
    return this.errorCodes[key];
  },
  getErrorMessage(code) {
    return Object.values(this.errorCodes).find(
      (e) => e.code.toLowerCase() === code.toLowerCase()
    );
  },
};

config.messages = Object.fromEntries(
  Object.values(ErrorKey).map((key) => [
    key,
    createMessageGenerator(key, config),
  ])
) as Record<ErrorKey, () => MessageEmbed>;

config.reactions = Object.fromEntries(
  Object.values(ReactionKey).map((key) => [
    key,
    createReactionGenerator(key, config),
  ])
) as Record<ReactionKey, () => string>;

export default config;
