enum ErrorKey {
    cooldown = "cooldown",
    permission = "permission",
    channel = "channel",
    args = "args",
    command = "command",
    error = "error",
    todo = "todo"
}
interface ErrorCode {
    code: string;
    msg: string;
}

type ErrorCodes = {
    [index in ErrorKey]: ErrorCode;
}

export { ErrorCodes, ErrorKey, ErrorCode };