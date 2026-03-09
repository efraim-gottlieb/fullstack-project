import fs from "fs/promises";

export async function getMovies(req, res) {
  app.post("/api/admin/login", (req, res) => {
    const pass = "1234";
    const { password } = req.body;
    if (pass == password) {
      res.send(generateToken({ pass }));
    } else {
      res.status(403).end("Unauthorized");
    }
  });
}
