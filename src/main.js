import express from "express";
import mysql from "mysql2/promise";
import fs from "fs-extra";
import cookie from "cookie-parser";
import mustache from "mustache";
import path from 'path';

import login from "./login.js";
import movieReg from "./register.js";

import { fileURLToPath } from "url";
import { dirname } from "path";
import { watch } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const app = express();
app.use("/", express.static("public"));


async function main() {
        const db = await mysql.createConnection({
            "host"     : '127.0.0.1',
            "user"     : 'admin',
            "password" : 'Pik12',
            "database" : 'movie'
        });
      console.log('Anslutning till databasservern lyckades!');

      const app = express();
      app.use("/", express.static("public"));

      // Funktion för inloggning
      app.get("/login", login(db));

      // Regestrera filmer
      app.get("/register", movieReg(db));

     // Funktion för logga ut från översikts sidan
     app.get("/logout", async function(req, res) {
      res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
     });

     // Skapa en middelwer som bara tillåter inloggade personer
      /*function isLoggedIn(req, res, next) {
      let token = req.cookies.login??"";
      let user = token_storage[token];
    
      if(user) {
        next()
        console.log("Allowed");
      }
      
      else {
        res.status(401).send("Not allowed");
        console.error("Not allowed");
      }
      }
      app.use("/secret/", isLoggedIn);

      app.get("/secret/test", function (req, res) {
        res.send("Hello World!");
      });
*/

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
