import { getMongoDbConnection } from "../db/mongo.js";
import { atbashCipher } from "../utils/atbashChiper.js";

export async function getUsers() {
  const conn = await getMongoDbConnection();
  const collection = conn.collection("users");
  const users = await collection.find().toArray();
  return users;
}

export async function createUser(agentCode, fullName, role) {
  const users = await getUsers();
  const id = Object.keys(users).length + 1;
  const user = {
    id,
    agentCode,
    fullName,
    role,
    password: atbashCipher(fullName),
  };
  const conn = await getMongoDbConnection();
  const collection = conn.collection("users");
  const newUser = await collection.insertOne({ user });
  return newUser;
}
