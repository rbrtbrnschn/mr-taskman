import chalk from "chalk";
import mongoose from "mongoose";
import config from "../config";

const { user, pass, host, db } = config.mongo;
const uri = `mongodb+srv://${user}:${pass}@${host}/${db}?retryWrites=true&w=majority`;

export default async (): Promise<void> => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `${chalk.greenBright.bold(
        "[MONGOOSE]:"
      )}${chalk.reset()} Selected database ~ ${db}.`
    );
  } catch (err) {
    console.log(
      `${chalk.red.bold("[MONGOOSE]:")}${chalk.reset()} connection interrupted`,
      err
    );
  }

  mongoose.connection.on("error", (err) => {
    console.log(
      `${chalk.red.bold("[MONGOOSE]:")}${chalk.reset()} Errored.\n ${err}`
    );
  });

  mongoose.connection.on("disconnected", () => {
    console.log(
      `${chalk.magenta.bold("[MONGOOSE]:")}${chalk.reset()} Lost connection.`
    );
  });
};
