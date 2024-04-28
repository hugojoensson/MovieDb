export default function movieLib(db) {
  return async function (req, res) {
    let question = "SELECT * FROM movie;";
    const rows = await db.execute(question);

    // Hämtar den id för första filmen
    const first_id = rows[0][0].id;
    console.log(first_id);

    // Hämtar id för sista filmen
    let question2 = "SELECT MAX(id) AS latest_id FROM movie";
    const latest_id_Obj = await db.execute(question2);
    const latest_id = latest_id_Obj[0][0].latest_id;
    console.log(latest_id);

    let movieCount = latest_id - first_id + 1;
    console.log(movieCount);

    let allMovies = {};

    for (let i = first_id; i < latest_id + 1; i++) {
      console.log("id: " + i);
      let question3 = "SELECT * FROM movie WHERE id = " + i;
      const movie = await db.execute(question3);

      let title = movie[0][0].title;
      console.log("title: " + title);

      let release_year = movie[0][0].release_year;
      console.log("release_year: " + release_year);

      let watch_date = movie[0][0].watch_date;
      console.log("watch_date: " + watch_date);

      let movie_length = movie[0][0].movie_length;
      console.log("movie_length: " + movie_length);

      let rating = movie[0][0].rating;
      console.log("rating: " + rating);

      console.log("             --------                     ");

      allMovies[i] = {
        title: title,
        release_year: release_year,
        watch_date: watch_date,
        movie_length: movie_length,
        rating: rating,
      };
    }
    let tableHTML = `
    <head>
    <meta charset="UTF-8">
    <title>Bibloteket</title>
    <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #121212;
      color: #ffffff;
      margin: 0;
      padding: 0;
      text-align: center;
  }
  
  h1 {
      color: #ffcc00;
      margin-top: 50px;
  }
  
  h2, h3 {
      color: #a0a0a0;
      margin-top: 20px;
  }
  
  table {
      width: 80%;
      margin: 30px auto;
      border-collapse: collapse;
  }
  
  th, td {
      padding: 10px;
      border-bottom: 1px solid #a0a0a0;
  }
  
  thead {
      background-color: #333333;
  }
  
  th {
      color: #ffcc00;
  }
  
  tbody tr:nth-child(even) {
      background-color: #333333;
  }
  
  tbody tr:nth-child(odd) {
      background-color: #444444;
  }
  
  td {
      color: #ffffff;
  }
    </style>
  </head>
    <h1>Bibloteket</h1>
    <h2>Här kan se vilka filmer och serier du har tittat på</h2>
    <h3>Du har lagt til ${movieCount} filmer</h3>
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
  `;
    // Loopa genom allMovies och lägg till varje film som en rad i tabellen
    for (const id in allMovies) {
      const movie = allMovies[id];
      tableHTML += `
      <tr>
        <td>${movie.title}</td>
        <td>${movie.release_year}</td>
        <td>${movie.watch_date}</td>
        <td>${movie.movie_length}</td>
        <td>${movie.rating}</td>
      </tr>
    `;
    }
    // Avsluta HTML-strängen för tabellen
    tableHTML += `
    </tbody>
  </table>
`;

    res.send(tableHTML);
  };
}
