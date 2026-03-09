import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URL = process.env.MONGO_URI;
const DB_NAME = "agents-reports";

if (!MONGO_URL) {
  throw new Error("Please define the MONGO_URI environment variable");
}

/**
 * Using global to preserve the connection across hot-reloads in dev.
 * In production, a standard variable usually suffices.
 */
let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function getMongoDbConnection() {
  // 1. If we already have a connection, return it immediately
  if (cached.conn) {
    return cached.conn;
  }

  // 2. If we are currently connecting, wait for that promise instead of starting a new one
  if (!cached.promise) {
    const opts = {
      // Add standard recommended options here if needed
    };

    const client = new MongoClient(MONGO_URL, opts);
    cached.promise = client.connect().then((client) => {
      return client.db(DB_NAME);
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Reset promise on error so we can try again
    throw e;
  }

  return cached.conn;
}