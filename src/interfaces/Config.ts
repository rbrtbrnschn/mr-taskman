import ErrorCodes from "./ErrorCodes";

interface Config {
    prefix: string;
    bot: Record<string, any>;
    colors: Record<string, any>;
    reactions: Record<string, any>;
    messages: Record<string, any>;
    errorCodes: ErrorCodes;
    getErrorCode: any;
    getErrorMessage: any;
}

export = Config;