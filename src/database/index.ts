import chalk from "chalk";
import mongoose from "mongoose";
const username = process.env.MONGODB_USER || "dev";
const password = process.env.MONGODB_PASS || "C0p5FqNEA5nV8UG7"; // provides read-only access
const uri = `mongodb+srv://${username}:${password}@cluster0.eit8m.mongodb.net/main?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log(`${chalk.greenBright.bold("[MONGOOSE CONNECTED]")}${chalk.reset()}`))
    .catch((err) => console.log(`${chalk.red.bold("[MONGOOSE CONNECT]")}${chalk.reset()}`, err));

mongoose.connection.on("error", () => {
    console.log(`${chalk.red.bold("[MONGOOSE ERROR]")}${chalk.reset()}`);
});
mongoose.connection.on("disconnected", () => {
    console.log(`${chalk.magenta.bold("[MONGOOSE DISCONNECT]")}${chalk.reset()}`);
});