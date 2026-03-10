import {createReport, getReports} from "../services/reports.services.js"


export async function submitReport(req, res) {
  const movies = JSON.parse(await fs.readFile("./data/movies.json", "utf-8"));
  const seats = JSON.parse(await fs.readFile("./data/seats.json", "utf-8"));
  movies.forEach((movie) => {
    movie.seats = seats[movie.imdbID];
  });
  res.send(movies);
}