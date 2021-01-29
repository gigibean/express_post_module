const express = require("express");
const app = express();

const mysql = require("mysql");

const cors = require("cors");

const port = process.env.PORT || 5000;
app.set("port", process.env.PORT || 5000);

const bodyParser = require("body-parser");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PSWD,
});

app.use(bodyParser.json());
const corsOpt = function (req, callback) {
  callback(null, { origin: true });
};

app.options("*", cors(corsOpt));
// connection.connect();
app.get("/", (req, res) => {
  res.send("working");
});
const sql =
  "INSERT INTO `test`.`resulttable`(q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, tag, result_char, extrovert, open) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
app.post("/save_result", cors(corsOpt), (req, res) => {
  const params = [];
  req.body.params.resultArray.map((value, index) => (params[index] = value));
  params[14] = req.body.params.tag;
  params[15] = req.body.params.character;
  params[16] = req.body.params.extrovert;
  params[17] = req.body.params.open;
  connection.query(sql, params, function (err, rows, fileds) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows.insertId);
    }
  });
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`server is listening at port->${port}`);
});
