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
    "Autocorrect alert! Well let's hope it was autocorrect, because that's not a command of mine."
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
        cooldown: (): string => cooldownMessages[Math.floor(Math.random() * cooldownMessages.length)],
        permission: (): string => permissionMessages[Math.floor(Math.random() * permissionMessages.length)],
        channel: (): string => channelMessages[Math.floor(Math.random() * channelMessages.length)],
        args: (): string => argsMessages[Math.floor(Math.random() * argsMessages.length)],
        command: (): string => commandMessages[Math.floor(Math.random() * commandMessages.length)]
    },
    colors: {
        primary: 0xFBDB48,
        secondary: 0x296d98
    }
};

export = config;