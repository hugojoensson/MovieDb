import express from "express";
import mysql from "mysql2/promise";
import fs from "fs-extra";
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';
import cookie from "cookie-parser";
import mustache from "mustache";
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



async function main() {
        const db = await mysql.createConnection({
            "host"     : '127.0.0.1',
            "user"     : 'admin',
            "password" : 'Pik12',
            "database" : 'movie'
        });
      console.log('Anslutning till databasservern lyckades!');
      
      // test
      const result = await db.execute('SELECT * FROM user;');
      console.log('Resultat av frågan:', result);

      const app = express();

      app.use("/", express.static("public"));

      // Test exempel
      app.get("/chatt", function(req, res) {
        let msg = req.query.msg;
        console.log(msg);
      });

      // Regestrera filmer
      app.get("/register", async function(req, res) {
        console.log('Got request to register new movie');
        let title = req.query.title;
       /* let release_year = req.query.release_year;
        let watch_date = req.query.watch_date;
        let movie_length = req.query.movie_length;
        let rating = req.query.rating;
*/
        console.log('Title: ', title);
  /*      console.log('Release year: ', release_year);
        console.log('Watch date: ', watch_date);
        console.log('Movie length: ', movie_length);
        console.log('Rating: ', rating);
*/
        let question = 'INSERT INTO movie (title , release_year, watch_date, movie_length, rating) VALUES ("'+title+'","'+0+'","'+0+'","'+0+'","'+0+'")';
        console.log('Query: ', question);
        await db.execute(question);
        console.log('Query executed');
      })
      

      // Funktion för inloggning
      app.get("/login", async function(req, res) {
        if (
          req.query &&
          typeof req.query.user === "string" &&
          typeof req.query.password === "string"
        ) 
        {
          const user_name = req.query.user;

          const password =
          crypto.createHash('md5').update(String(req.query.password)).digest('hex');

          let question = 'SELECT name,password FROM user WHERE name ="'+user_name+'"';
          const user_answer = await db.execute(question);

          const password_from_database = user_answer.values().next().value[0].password;

          if(password_from_database === password) {
            const token_storage = {};
            const token = uuid();
            token_storage[token] = user_name;

            res.cookie("login", token, {maxAge: 10000000});

            res.sendFile(path.join(__dirname, '..', 'public', 'overview.html'));
          }
           else {
            res.send("Fel lösenord!");
          }
        }
        else {
          res.send("Du har inte skrivit in anvädnarnamn eller lösenord!");
        }
     });
    
     // Funktion för logga ut från översikts sidan
     app.get("/logout", async function(req, res) {
      res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
     });

     // Saker med kakor som inte fungerar
     app.use(cookie());

     app.get("/", async function(req, res) {
      let count = 0;
  
      if(req.cookies.count === undefined) {
          res.cookie("count", 0, {maxAge: 100000000});
      } else {
          count = Number(req.cookies.count);
          count++;
          res.cookie("count", count, {maxAge: 100000000});
      }
      
      const template = await fs.readFile("./public/index.html", "utf-8");
      const data = {"count": count};
      const document = mustache.render(template, data);
      res.send(document);
    });
     

      const port = 8080;

      app.listen(port, () => {
        console.log("You can find this server on: http://localhost:" + port);
      });
  
  
      return db;
    }
main();
