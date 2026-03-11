import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import reportsRoutes from "./routes/reports.routes.js";
import adminRoutes from "./routes/admin.routes.js";

import { createUser } from "./services/auth.service.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

app.get("/d", async (req, res) => {
  const a = await createUser("miri", "miri", "admin");
  res.send(a);
});

app.get("/", (req, res) => {
  res.send("hello");
  console.log("pinging root");
});

app.use("/auth", authRoutes);
app.use("/reports", reportsRoutes);
app.use("/admin", adminRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});