import crypto from "crypto";
import { v4 as uuid } from "uuid";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function login(db) {
  return async function (req, res) {
    if (
      req.query &&
      typeof req.query.user === "string" &&
      typeof req.query.password === "string"
    ) {
      const user_name = req.query.user;

      const password = crypto
        .createHash("md5")
        .update(String(req.query.password))
        .digest("hex");

      let question =
        'SELECT name,password FROM user WHERE name ="' + user_name + '"';
      const user_answer = await db.execute(question);

      // Kontrollerar att användarnamnet finns
      if (user_answer.values().next().value[0] === undefined) {
        res.send("Användarnamnet finns ej!");
        return;
      }
      const password_from_database = user_answer.values().next()
        .value[0].password;

      if (password_from_database === password) {
        const token_storage = {};
        const token = uuid();
        token_storage[token] = user_name;
        console.log(token_storage);
        res.cookie("login", token, { maxAge: 10000000 });

        res.sendFile(path.join(__dirname, "..", "public", "overview.html"));
      } else {
        res.send("Fel lösenord!");
      }
    } else {
      res.send("Du har inte skrivit in anvädnarnamn eller lösenord!");
    }
  };
}
