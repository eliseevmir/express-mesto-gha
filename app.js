const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routerUsers = require("./src/routes/users");
const routerCards = require("./src/routes/cards");

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: "62efc56dcb9be6aa9ddd23c1",
  };

  next();
});

app.use("/", routerUsers);
app.use("/", routerCards);
app.use((req, res) => {
  res.status(404).send({ message: "Роут не найден" });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("Server startup error");
  }
  console.log(`Application listening on port ${PORT}`);
});
