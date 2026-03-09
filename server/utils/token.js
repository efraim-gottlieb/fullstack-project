import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export function generateToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "100h" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.SECRET_KEY)
  } catch {
    return false
  }
}