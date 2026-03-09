import express from "express";
import * as adminControllers from "../controllers/admin.controller.js";
import { auth } from "../middlewares/auth.middleware.js";


const router = express.Router();
router.route("/")
  .post(auth ,adminControllers.createNewUser)


export default router;