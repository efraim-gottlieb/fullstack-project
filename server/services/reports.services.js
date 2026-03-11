import { getMongoDbConnection } from "../db/mongo.js";

export async function getReports(userId = null) {
  const conn = await getMongoDbConnection();
  const collection = conn.collection("reports");
  const filter = userId ? { userId } : {};
  const reports = await collection.find(filter).toArray();
  return reports;
}

export async function createReport(
  userId,
  category,
  urgency,
  message,
  image = null,
  extraFields = {},
) {
  const reports = await getReports();
  const id = Object.keys(reports).length + 1;
  const report = {
    id,
    userId,
    category,
    urgency,
    message,
    image,
    ...extraFields,
  };
  const conn = await getMongoDbConnection();
  const collection = conn.collection("reports");
  const newReport = await collection.insertOne(report);
  return newReport;
}
