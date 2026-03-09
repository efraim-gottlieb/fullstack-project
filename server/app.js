import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import reportsRoutes from "./routes/reports.routes.js";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

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

function generateToken(payload) {
  return jwt.sign(payload, "secretKey", { expiresIn: "100h" });
}



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
