import express from "express";
import mysql from "mysql2/promise";
import fs from "fs-extra";
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';
import path from 'path';

import { app } from "./main.js"; // Importera app från main.js



export default async function login(db) {
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
  }