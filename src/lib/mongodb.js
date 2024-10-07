import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function connectToDatabase() {
  await client.connect();
  return client.db("clind-project");
}

export function getUserCollection(userId) {
  return `user_${userId}`;
}
