import chalk from "chalk";
import mongoose from "mongoose";
import { bot } from "../config";

const username = process.env.MONGODB_USER || "dev";
const password = process.env.MONGODB_PASS || "C0p5FqNEA5nV8UG7"; // provides read-only access
const db = bot.isProd ? "main" : "dev";
const uri = `mongodb+srv://${username}:${password}@cluster0.eit8m.mongodb.net/${db}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        console.log(`${chalk.greenBright.bold("[MONGOOSE]:")}${chalk.reset()} Selected database ~ ${db}.`);
    })
    .catch((err) => console.log(`${chalk.red.bold("[MONGOOSE]:")}${chalk.reset()} connection interrupted)}`, err));

mongoose.connection.on("error", (err) => {
    console.log(`${chalk.red.bold("[MONGOOSE]:")}${chalk.reset()} Errored.\n ${err}`);
});
mongoose.connection.on("disconnected", () => {
    console.log(`${chalk.magenta.bold("[MONGOOSE]:]")}${chalk.reset()} Lost connection.`);
});