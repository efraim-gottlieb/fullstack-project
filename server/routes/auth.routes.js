import express from "express";
import * as authControllers from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.middleware.js";


const router = express.Router();
router.route("/login")
  .post(authControllers.login)

router.route("/me").get(auth, authControllers.profile)


export default router;