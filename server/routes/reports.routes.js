import express from "express";
import * as  reporesControllers from "../controllers/repores.controller.js";


const router = express.Router();
router.route("/")
  .post(reporesControllers.submitReport)


export default router;