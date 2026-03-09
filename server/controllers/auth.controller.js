import { getMongoDbConnection } from "../db/mongo.js";
import { getUsers, createUser } from "../services/auth.service.js";
import { generateToken } from "../utils/tokenGenerator.js";

export async function login(req, res) {
  const { username, password } = req.body;
  const users = await getUsers();
  const user = users.find((u) => u.fullName == username);
  if (user || user.password == password) {
    res.send(generateToken(user));
  } else {
    res.status(403).end("Unauthorized");
  }
}
