import { getMongoDbConnection } from "../db/mongo.js";
import { getUsers, createUser } from "../services/auth.service.js";
import { verifyToken } from "../utils/token.js";
import { generateToken } from "../utils/token.js";

export async function login(req, res) {
  const { username, password } = req.body;
  const users = await getUsers();
  console.log(users);
  const user = users.find((u) => u.fullName == username);
  if (user && user.password == password) {
    res.send(generateToken(user));
  } else {
    res.status(403).end("Unauthorized");
  }
}

export async function profile(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = verifyToken(token);
    if (!user) res.status(403).end("Unauthorized");
    const { id, agentCode, role } = user;
    res.send({ id, agentCode, role });
  } catch {
    res.status(403).end("Unauthorized");
  }
}
