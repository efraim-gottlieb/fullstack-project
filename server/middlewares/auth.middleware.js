import { verifyToken } from "../utils/token.js";

export async function auth(req, res, next) {
    const token = req.headers.authorization.split(" ")[1]
    console.log(token)
    const user = verifyToken(token)
    if (!user) res.status(403).send('Unauthorized')
    req.user = user
    next()
}
