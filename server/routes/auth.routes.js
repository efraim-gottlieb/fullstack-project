import express from "express";
import * as authControllers from "../controllers/auth.controller.js";


const router = express.Router();
router.route("/login")
  .post(authControllers.login)


export default router;