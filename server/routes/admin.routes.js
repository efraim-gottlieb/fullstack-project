import express from "express";
import * as adminControllers from "../controllers/admin.controller.js";
import { admin, auth } from "../middlewares/auth.middleware.js";


const router = express.Router();
router.route("/users")
  .post(auth, admin ,adminControllers.createNewUser)
  .get(auth, admin, adminControllers.getAllUsers)


export default router;