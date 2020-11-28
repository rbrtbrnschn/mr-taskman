// import Config from "./interfaces/Config";

import messagesData from "./data/messages";

const { NODE_ENV = "development" } = process.env;
const isProd = NODE_ENV === "production" ? true : false;

export enum ErrorKey {
    cooldown = "cooldown",
    permission = "permission",
    channel = "channel",
    args = "args",
    command = "command",
    error = "error",
    todo = "todo"
}

interface Bot {
    name: string;
    version: string;
    isProd: boolean;
    path2Commands: string;
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

interface ErrorCode {
    code: string;
    msg: string;
}

type ErrorCodes = {
    [index in ErrorKey]: ErrorCode;
}

type MessageGenerator = () => string;

interface Config {
    prefix: string;
    bot: Bot;
    colors: Colors;
    reactions: Reactions;
    messages: Record<ErrorKey, MessageGenerator>;
    errorCodes: ErrorCodes;
    getErrorCode(key: ErrorKey): string;
    getErrorMessage(key: ErrorKey): string;
}

const createMessageGenerator = (key: ErrorKey): () => string => {
    const messageArray: string[] = messagesData[key];
    const randomIndex: number = Math.floor(Math.random() * messageArray.length);
    return () => {
        // Following ignore is due to optional chaining failing override this undefined check
        // Also this is horrifying.
        //@ts-ignore
        return `${messageArray[randomIndex]}\n \`${this.default.getErrorCode(key)}\``;
    };
};

const config: Config = {
    prefix: isProd ? "/" : "!",
    bot: {
        name: "Mr.Taskman",
        version: "2.0.0",
        isProd: isProd,
        path2Commands: isProd ? "/home/norlin/dev/discord-bots/mr-taskman/current/build/commands" : "/home/norlin/dev/discord-bots/mr-taskman/src/commands"
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
    // There are problems with typescript and Object.fromEntries. Recommend manually doing it, but this is a patch for now
    //@ts-ignore
    messages: Object.fromEntries(Object.values(ErrorKey).map(key => [key, createMessageGenerator.call(this, key)])) as Record<ErrorKey, MessageGenerator>,
    errorCodes: {
        "cooldown": { code: "E00100", msg: "Cooldown is still active. Just wait a few" },
        "permission": { code: "E00200", msg: "You are not allowed to do this." },
        "channel": { code: "E00300", msg: "You are performing this in the wrong channel. Some commands I cannot perform in direct messages." },
        "args": { code: "E00400", msg: "You were missing the needed arguments for a command." },
        "command": { code: "E00500", msg: "You misspelled a command. It does not exist." },
        "error": { code: "E00600", msg: "The bot errored. The developer team has been notified." },
        "todo": { code: "E00700", msg: "This command is still a WIP." }
    },
    getErrorCode(key) {
        return this.errorCodes[key].code;
    },
    getErrorMessage(key) {
        return this.errorCodes[key].msg;
    },
};

export default config;

export const { prefix, bot, colors, reactions, messages, errorCodes } = config;

