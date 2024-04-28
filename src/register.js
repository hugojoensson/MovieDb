import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function movieReg(db) {
  return async function (req, res) {
    let title = req.query.title;
    let release_year = req.query.release_year;
    let watch_date = req.query.watch_date;
    let movie_length = req.query.movie_length;
    let rating = req.query.rating;

    let question =
      'INSERT INTO movie (title , release_year, watch_date, movie_length, rating) VALUES ("' +
      title +
      '","' +
      release_year +
      '","' +
      watch_date +
      '","' +
      movie_length +
      '","' +
      rating +
      '")';
    await db.execute(question);

    res.sendFile(path.join(__dirname, "..", "public", "overview.html"));
  };
}
