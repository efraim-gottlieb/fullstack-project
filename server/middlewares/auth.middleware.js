import { verifyToken } from "../utils/token.js";

export async function auth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const user = verifyToken(token);
        if (!user) res.status(403).end("Unauthorized");
        req.user = user
        next();

    } catch {
        res.status(403).end('Unauthorized')
    }
}
export async function admin(req, res, next) {
    req.user.role == "admin" ? next(): res.status(403).end('Unauthorized')
}