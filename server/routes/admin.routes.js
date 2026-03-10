import express from "express";
import * as adminControllers from "../controllers/admin.controller.js";
import { isAdmin, auth } from "../middlewares/auth.middleware.js";


const router = express.Router();
router.route("/users")
  .post(auth, isAdmin ,adminControllers.createNewUser)
  .get(auth, isAdmin, adminControllers.getAllUsers)


export default router;