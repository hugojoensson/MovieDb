import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function registerUser(db) {
  return async function (req, res) {
    if (req.query && req.query.user === "" && req.query.password === "") {
      res.send("Du har inte skrivit in anvädnarnamn eller lösenord!");
      return;
    }

    const user_name = req.query.user;
    const password = req.query.password;

    let question = "SELECT id FROM user ORDER BY id DESC LIMIT 1;";
    const latest_id = await db.execute(question);
    const new_id = latest_id[0][0].id + 1;

    let question2 =
      'INSERT INTO user (id, name, password) VALUES ("' +
      new_id +
      '","' +
      user_name +
      '", MD5("' +
      password +
      '"))';

    await db.execute(question2);

    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
  };
}
