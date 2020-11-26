// const { NODE_ENV = "development" } = process.env;
// const isProd = NODE_ENV === "production" ? true : false;

const cooldownMessages = [
    "Well aren't you just a quick little fellow.",
    "Ohh, you got me. Guess I am just too old for this.",
    "Not again! Let me get my reading glasses.",
    "Huh, well that was faster than expected.",
    "I got another call on the line. Let me call you back.",
    "Stop... Hammertime!",
    "Execuse my harsh language but what?",
    "Let me get my hearing aid, I can't read without anymore.",
    "Let's play a game, okay? You wait and I'll just take a quick break.",
    "Do you smell that? That is my cpu melting...",
    "Go easy on me, would ya."
];
const permissionMessages = [
    "Are you even old enough to do this?",
    "I need to see your ID first.",
    "You sound awfully young to do that.",
    "How about this. No.",
    "Cherry pies have always been my favourite. Life ain't fair.",
    "In the famous words of Simon Cowell ~ 'It's a no from me'",
    // TODO expand
];
const channelMessages = [
    "You know you're not supposed to be in here.",
    "I can't really help you in this situation.",
    "I believe in you. You'll get it right.",
    "I think this is not the place for you right now.",
    "Do you ever wonder, 'What am I doing here?'. Well I am.",
    "Get outta here.",
    "Don't let the door hit you on your way out.",
    "This town ain't big enough for the both of us."
];

const config = {
    prefix: "/",
    reactions: {
        good: "👌",
        bad: "😭",
        great: "💯",
    },
    bot: {
        name: "Mr.Taskman",
        version: "2.0.0"
    },
    messages: {
        cooldown: () => cooldownMessages[Math.floor(Math.random() * cooldownMessages.length)],
        permission: () => permissionMessages[Math.floor(Math.random() * permissionMessages.length)],
        channel: () => channelMessages[Math.floor(Math.random() * channelMessages.length)],
    }
};

export = config;