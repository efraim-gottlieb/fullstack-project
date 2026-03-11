import { getUsers } from "../services/auth.service.js";
import { verifyToken } from "../utils/token.js";
import { generateToken } from "../utils/token.js";
import { compare } from "../utils/hash.js";

export async function login(req, res) {
  const { username, password } = req.body;
  const users = await getUsers();
  const user = users.find((u) => u.fullName == username);
  if (!user) {
    return res.status(403).end("Unauthorized");
  }
  const isMatch = await compare(password, user.password);
  if (isMatch) {
    res.send({ token: generateToken(user) });
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
