import express from "express";
import multer from "multer";
import * as reporesControllers from "../controllers/repores.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.route("/")
  .get(auth, reporesControllers.reports)
  .post(auth, reporesControllers.submitReport);

router.route("/csv")
  .post(auth, upload.single("file"), reporesControllers.submitCsvReportsFile);

export default router;
