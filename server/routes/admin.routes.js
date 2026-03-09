import express from "express";
import * as adminControllers from "../controllers/admin.controller.js";


const router = express.Router();
router.route("/")
  .get(adminControllers.getMovies)


export default router;