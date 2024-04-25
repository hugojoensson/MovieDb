export default function movieReg(db) {
  return async function (req, res) {
    let title = req.query.title;
    let release_year = req.query.release_year;
    let watch_date = req.query.watch_date;
    let movie_length = req.query.movie_length;
    let rating = req.query.rating;

    let question = 'INSERT INTO movie (title , release_year, watch_date, movie_length, rating) VALUES ("'+title+'","'+release_year+'","'+watch_date+'","'+movie_length+'","'+rating+'")';
    await db.execute(question);

    let question2 ='SELECT * FROM movie';
    let answer = await db.execute(question);

    res.send("Filmen har lagts till:" + answer);
  };
}