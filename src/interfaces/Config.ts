import { MessageEmbed } from "discord.js";
import { ErrorKey, ErrorCode, ErrorCodes } from "./ErrorCodes";
import ThirdpartyServiceInterface from "./thirdpartyService";

interface Bot {
  name: string;
  version: string;
  isProd: boolean;
  path2Commands: string;
}

interface Mongo {
  user: string;
  pass: string;
  host: string;
  db: "main" | "dev";
}

type Color = number;

interface Colors {
  primary: Color;
  secondary: Color;
}

// interface Reactions {
//   good: string;
//   bad: string;
//   great: string;
// }

export enum ReactionKey {
  good = "good",
  error = "error",
}

type MessageGenerator = () => MessageEmbed;

type ReactionGenerator = () => string;

interface Config {
  prefix: string;
  bot: Bot;
  mongo: Mongo;
  colors: Colors;
  messages: Record<ErrorKey, MessageGenerator>;
  reactions: Record<ReactionKey, ReactionGenerator>;
  errorCodes: ErrorCodes;
  getErrorCode(key: ErrorKey): ErrorCode;
  getErrorMessage(key: string): ErrorCode;
  taskColors: Record<string, string>;
  thirdpartyService: ThirdpartyServiceInterface;
}

export default Config;
