import express from "express";
import complaintsRoutes from "./routes/complaintsRoutes.js";
import cors from "cors";
import jwt from "jsonwebtoken";



const app = express();
const port = process.env.port || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
  console.log("pinging root");
});

app.use("/complaints", complaintsRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

function generateToken(payload) {
  return jwt.sign(payload, "secretKey", { expiresIn: "100h" });
}

app.post("/api/admin/login", (req, res) => {
  const pass = "1234";
  const { password } = req.body;
  if (pass == password) {
    res.send(generateToken({ pass }));
  } else {
    res.status(403).end("Unauthorized");
  }
});




app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});