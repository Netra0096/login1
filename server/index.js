const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//mysql
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Passw0rd",
  database: "crud_contact",
});

//db.on("error", () => console.log("Error in DB Connection"));
//db.once("open", () => console.log("Connected to Databese"));

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "select * from users where username=? and password=?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong Username/Password given!!!" });
      }
    }
  );
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "insert into users (username,password) values(?,?)",
    [username, password],
    (err, result) => {
      if (err) {
        console.log("error", err);
      }
      if (result) {
        res.send(result);
      }
    }
  );
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
