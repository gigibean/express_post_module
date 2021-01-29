const express = require("express");
const app = express();

const mysql = require("mysql");

const cors = require("cors");

const port = process.env.EXPRESS_PORT;
app.set("port", process.env.EXPRESS_PORT);

const bodyParser = require("body-parser");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PSWD,
  database: process.env.DB_DB,
});

app.use(bodyParser.json());
const corsOpt = function (req, callback) {
  callback(null, { origin: true });
};

app.options("*", cors(corsOpt));
// connection.connect();
app.post("/save_result", cors(corsOpt), (req, res) => {
  //   connection.query("");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});
