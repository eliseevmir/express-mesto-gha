const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { errors } = require("celebrate");
const routerUsers = require("./src/routes/users");
const routerCards = require("./src/routes/cards");
const { login, createUser } = require("./src/controllers/users");
const auth = require("./src/middlewares/auth");
require("dotenv").config();

const { PORT = 3000 } = process.env;
const {
  STATUS_CODE_400,
  STATUS_CODE_404,
  STATUS_CODE_500,
} = require("./src/utils/constants");
const createUserSchema = require("./src/schemaValidator/createUser.js");
const loginUserSchema = require("./src/schemaValidator/loginUser.js");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();
app.use(helmet());
app.use(limiter);

mongoose
  .connect("mongodb://127.0.0.1:27017/mestodb")
  .catch((err) => console.error("DB connection is failure", err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/signin", loginUserSchema, login);
app.post("/signup", createUserSchema, createUser);

app.use(auth);
app.use("/", routerUsers);
app.use("/", routerCards);

app.use((req, res) => {
  res.status(STATUS_CODE_404).send({ message: "Роут не найден" });
});

app.use(errors());

app.use((err, req, res, next) => {
  if (err instanceof mongoose.Error.CastError) {
    return res
      .status(STATUS_CODE_400)
      .send({ message: "Данные введены некорректно" });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(STATUS_CODE_400).send({
      message: "Переданы некорректные данные",
    });
  }

  if (err instanceof Error) {
    return res.status(STATUS_CODE_404).send({ message: err.message });
  }

  return res.status(STATUS_CODE_500).send({ message: "Ошибка по умолчанию" });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("Server startup error");
  }
  console.log(`Application listening on port ${PORT}`);
});
