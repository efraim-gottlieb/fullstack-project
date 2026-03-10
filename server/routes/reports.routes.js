import express from "express";
import * as reporesControllers from "../controllers/repores.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/")
  .get(auth, reporesControllers.reports)
  .post(auth, reporesControllers.submitReport);

router.route("/csv")
  .post(reporesControllers.submitCsvReportsFile);

export default router;
