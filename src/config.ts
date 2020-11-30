// import Config from "./interfaces/Config";

import messagesData from "./data/messages";
import Config from "./interfaces/Config";
import { ErrorKey } from "./interfaces/ErrorCodes";

const { NODE_ENV } = process.env;
const isProd = NODE_ENV === "production";

const createMessageGenerator = (key: ErrorKey, config: Config): () => string => {
    const messageArray: string[] = messagesData[key];
    const randomIndex: number = Math.floor(Math.random() * messageArray.length);
    return () => {
        return `${messageArray[randomIndex]}\n \`${config.getErrorCode(key).code}\``;
    };
};

const config: Config = {
    prefix: isProd ? "/" : "!",
    bot: {
        name: "Mr.Taskman",
        version: "2.0.0",
        isProd: isProd,
        path2Commands: isProd ? process.env.PATH2COMMANDS_PROD : process.env.PATH2COMMANDS_DEV
    },
    colors: {
        primary: 0xFBDB48,
        secondary: 0x296d98
    },
    reactions: {
        good: "👌",
        bad: "😭",
        great: "💯",
    },
    messages: null,
    errorCodes: {
        "cooldown": { code: "E00100", msg: "Cooldown is still active. Just wait a few seconds." },
        "permission": { code: "E00200", msg: "Unauthorized Access. You are not allowed to do this." },
        "channel": { code: "E00300", msg: "Wrong channel. Some commands cannot be performed in dms." },
        "args": { code: "E00400", msg: "Missing arguments. Command requires arguments." },
        "command": { code: "E00500", msg: "Command not found." },
        "error": { code: "E00600", msg: "The bot errored. The developer team has been notified." },
        "todo": { code: "E00700", msg: "This command is still a WIP." }
    },
    getErrorCode(key) {
        return this.errorCodes[key];
    },
    getErrorMessage(code) {
        return Object.values(this.errorCodes).find((e) => e.code.toLowerCase() === code.toLowerCase());
    },
};

config.messages = Object.fromEntries(Object.values(ErrorKey).map(key => [key, createMessageGenerator(key, config)])) as Record<ErrorKey, () => string>;

export default config;

export const { prefix, bot, colors, reactions, messages, errorCodes, getErrorCode, getErrorMessage } = config;

