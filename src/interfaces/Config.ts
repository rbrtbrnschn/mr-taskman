import { MessageEmbed } from "discord.js";
import { ErrorKey, ErrorCode, ErrorCodes } from "./ErrorCodes";

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
  db: 'main' | 'dev';
}

type Color = number;

interface Colors {
  primary: Color;
  secondary: Color;
}

interface Reactions {
  good: string;
  bad: string;
  great: string;
}
type MessageGenerator = () => MessageEmbed;

interface Config {
  prefix: string;
  bot: Bot;
  mongo: Mongo;
  colors: Colors;
  reactions: Reactions;
  messages: Record<ErrorKey, MessageGenerator>;
  errorCodes: ErrorCodes;
  getErrorCode(key: ErrorKey): ErrorCode;
  getErrorMessage(key: string): ErrorCode;
  taskColors: Record<string, string>;
}

export default Config;
