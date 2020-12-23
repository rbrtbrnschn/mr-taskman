import mongoose from "mongoose";
import config from "../config";
const db = "tests";
const { host } = config.mongo;
const usernpass = "jest";
const uri = `mongodb+srv://${usernpass}:${usernpass}@${host}/${db}?retryWrites=true&w=majority`;

export async function initTestingDatabase(): Promise<void> {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export async function cleanupTestingDatabase(): Promise<void> {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany({});
  }
}
