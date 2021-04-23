const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "test",
    databeste: "my-portfolio",
  },
});

db.select("*")
  .from("messages")
  .then((data) => {
    console.log(data);
  });
//
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
//
// const db = knex({
//   client: "pg",
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
//   },
// });

const app = express();

app.use(cors());
app.use(express.json());

app.post("/", (req, res) => {
  const { name, email, message } = req.body;
  db("messages")
    .insert({
      name: name,
      email: email,
      message: message,
      sent: new Date(),
    })
    .then(console.log);
  res.json("success");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`apps running on ${process.env.PORT}`);
});
