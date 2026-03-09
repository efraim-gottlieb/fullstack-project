import { getUsers, createUser } from "../services/auth.service.js";

export async function createNewUser(req, res) {
  const { agentCode, fullName, role } = req.body;
  const user = await createUser(agentCode, fullName, role);
  res.status(201).json(user);
}
export async function getAllUsers(req, res) {
  const users = await getUsers();
  res.json(users);
}
