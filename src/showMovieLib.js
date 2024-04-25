/*export default function movieReg(db) {
  return async function (req, res) {
    let title = req.query.title || 'Unknown';
    let release_year = req.query.release_year ? parseInt(req.query.release_year) : 0;
    let watch_date = req.query.watch_date || 'Unknown';
    let movie_length = req.query.movie_length ? parseInt(req.query.movie_length) : 0;
    let rating = req.query.rating ? parseFloat(req.query.rating) : 0;

    let question = `
      INSERT INTO movie (title, release_year, watch_date, movie_length, rating)
      VALUES ("${title}", ${release_year}, "${watch_date}", ${movie_length}, ${rating})
    `;

    await db.execute(question);
  
      try {
        const [movies] = await db.execute('SELECT * FROM movie');
        const moviesData = movies.map(movie => ({
          title: movie.title,
          release_year: movie.release_year,
          watch_date: movie.watch_date,
          movie_length: movie.movie_length,
          rating: movie.rating
        }));
        
        const table = `
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Release Year</th>
                <th>Watch Date</th>
                <th>Movie Length</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              ${moviesData.map(movie => `
                <tr>
                  <td>${movie.title}</td>
                  <td>${movie.release_year}</td>
                  <td>${movie.watch_date}</td>
                  <td>${movie.movie_length}</td>
                  <td>${movie.rating}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
  
        res.send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <title>Bibloteket</title>
          </head>
          <body>
              <h1>Bibloteket</h1>
              <h2>Här kan du se vilka filmer och serier du har tittat på</h2>
              ${table}
              <script>
                // Din JavaScript kod här, om du behöver det
              </script>
          </body>
          </html>
        `);
      } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).send('Error fetching movies');
      }
    };
  }
  */