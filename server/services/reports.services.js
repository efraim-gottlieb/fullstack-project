import { getMongoDbConnection } from "../db/mongo.js";

export async function getReports() {
  const conn = await getMongoDbConnection();
  const collection = conn.collection("reports");
  const reports = await collection.find().toArray();
  return reports;
}

export async function createReport(agentCode, fullName, role) {
  const users = await getReports();
  const id = Object.keys(users).length + 1;
  const report = {
    id,
    agentCode,
    fullName,
    role,
    password: atbashCipher(fullName),
  };
  const conn = await getMongoDbConnection();
  const collection = conn.collection("users");
  const newUser = await collection.insertOne(report);
  return newUser;
}
