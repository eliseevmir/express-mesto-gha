const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const routerUsers = require('./src/routes/users');
const routerCards = require('./src/routes/cards');

const handlerError = require('./src/errors/HandlerError');
const NotFoundError = require('./src/errors/NotFoundError');

const { login, createUser } = require('./src/controllers/users');
const auth = require('./src/middlewares/auth');
require('dotenv').config();

const { PORT = 3000 } = process.env;

const createUserSchema = require('./src/schemaValidator/createUser');
const loginUserSchema = require('./src/schemaValidator/loginUser');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();
app.use(helmet());
app.use(limiter);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', loginUserSchema, login);
app.post('/signup', createUserSchema, createUser);

app.use(auth);
app.use('/', routerUsers);
app.use('/', routerCards);

app.use(() => {
  throw new NotFoundError('Роут не найден');
});

app.use(errors());

app.use(handlerError);

app.listen(PORT);
