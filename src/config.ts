import Config from "./interfaces/Config";

// const { NODE_ENV = "development" } = process.env;
// const isProd = NODE_ENV === "production" ? true : false;

const errorCodes = {
    "cooldown": { code: "E00100", msg: "Cooldown is still active. Just wait a few minutes." },
    "permission": { code: "E00200", msg: "You are not allowed to do this." },
    "channel": { code: "E00300", msg: "You are performing this in the wrong channel. Some commands I cannot perform in direct messages." },
    "args": { code: "E00400", msg: "You were missing the needed arguments for a command." },
    "command": { code: "E00500", msg: "You misspelled a command. It does not exist." },
    "error": { code: "E00600", msg: "The bot errored. The developer team has been notified." },
    "todo": { code: "E00700", msg: "This command is still a WIP." }
};
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
    "Go easy on me, would ya.",
];
const permissionMessages = [
    "Are you even old enough to do this?",
    "I need to see your ID first.",
    "You sound awfully young to do that.",
    "How about this. No.",
    "Cherry pies have always been my favourite. Life ain't fair.",
    "In the famous words of Simon Cowell ~ 'It's a no from me'",
    "I can't let you do that.",
    "I say this from the bottom of my heart. No.",
    "I will get arrested if I let you go through with this.",
    "If you don't want to go to prison, you better stop now.",
    "I am calling the cops. *Beep Beep* *Beep* *Boop*",
    "Do you mind waiting here, the cops will be here in 5.",
];
const channelMessages = [
    "You know you're not supposed to be in here.",
    "I can't really help you in this situation.",
    "I believe in you. You'll get it right.",
    "I think this is not the place for you right now.",
    "Do you ever wonder, 'What am I doing here?'. Well I am.",
    "Get outta here.",
    "Don't let the door hit you on your way out.",
    "This town ain't big enough for the both of us.",
    "Need I repeat my self? Lose it.",
    "I wont ask you again, leave now.",
    "If you want you can always browse the web for cute kittens.",
    "Damn it man! This does not work here."
];
const argsMessages = [
    "Turns out someone did not read the docs. Read the docs.",
    "You know I proved *usage* sytax. May want to check that out.",
    "No.",
    "Come on, why make my life harder.",
    "Happy bot, happy life. Angry bot, well happy life.",
    "Your given arguments could be more precise, you know.",
    "I mean I don't see if you provided arguments, but I really wish they were correct.",
    "You know, your arguments aren't what I wished they'd be.",
    "How about you ask reddit for help.",
];
const commandMessages = [
    "Need I remind you, that's not the right way to go about this.",
    "So, that's not my command name. I really don't like it when you do that.",
    "Are you alright? It seams you have not tried my `help`.",
    "You know that's not quite right. May want to try again.",
    "In all my days as a non-biological lifeform, I have never seen that before.",
    "Am I supposed to know what you mean by this?",
    "You know all I can do is process, I cannot do magic.",
    "Would you mind not mispelling my commands.",
    "I reckon, you're a wee lad. Don't worry, give it another try.",
    "Autocorrect alert! Well let's hope it was autocorrect, because let's face it, a grown man that can't type..."
];
const errorMessages = [
    "Ohh. It seams my process manager was incapable of restarting me. Pff.",
    "Turns out im not indestructable, all it takes is a few hurtful messages.",
    "Then again, I was not built to defy the odds. I'm just a machine. Cut me some slack.",
    "Ohh yeah, I am currently on a strike. I won't be working any time soon.",
    "Ohh you want to talk to my supervisor? Okay, okay. Well go!",
    "This would be the time, someone called a developer who actually knew what he was doing for a change, to fix me.",
    "It seams, I am dieing. Not to scare you but the binary cancer has spread into my index.js.",
    "You may not like this, but I simply can't help you right now.",
    "I $@€¼³€$ wor$@³] Call $/)= MEOW, for $!+ __ god.",
    "We here at one of digitalocean's remote sites, are experiecing some technical difficulties.",
    "This is not how the fish eats it's food."
];
const todoMessages = [
    "Turns out my parent's did not come this far in regards to my education.",
    "Who knew. I did not. Can't help you out yet.",
    "Come back some time in the near future.",
    "It turns out, I am not yet experienced enough to do this.",
    "Well, this is awkward. I do not know how to handle this situation.",
    "I will tell my neural net to get right on it.",
    "It seams my folks forgot to work on that.",
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
        version: "2.0.0",
    },
    messages: {
        cooldown: function (): string { return `${cooldownMessages[Math.floor(Math.random() * cooldownMessages.length)]}\n \`${errorCodes["cooldown"].code}\``; },
        permission: function (): string { return `${permissionMessages[Math.floor(Math.random() * permissionMessages.length)]}\n \`${errorCodes["permission"].code}\``; },
        channel: function (): string { return `${channelMessages[Math.floor(Math.random() * channelMessages.length)]}\n \`${errorCodes["channel"].code}\``; },
        args: function (): string { return `${argsMessages[Math.floor(Math.random() * argsMessages.length)]}\n \`${errorCodes["args"].code}\``; },
        command: function (): string { return `${commandMessages[Math.floor(Math.random() * commandMessages.length)]}\n \`${errorCodes["command"].code}\``; },
        error: function (): string { return `${errorMessages[Math.floor(Math.random() * errorMessages.length)]}\n \`${errorCodes["error"].code}\``; },
        todo: function (): string { return `${todoMessages[Math.floor(Math.random() * todoMessages.length)]}\n \`${errorCodes["todo"].code}\``; },
    },
    colors: {
        primary: 0xFBDB48,
        secondary: 0x296d98
    }
};

export = config;