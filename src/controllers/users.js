const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { NODE_ENV, JWT_SECRET } = process.env;
const { STATUS_CODE_200, STATUS_CODE_201 } = require("../utils/constants");
const NotFoundError = require("../errors/NotFoundError");
const UnAuthorizedError = require("../errors/UnAuthorized");

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError("Пользователь по указанному _id не найден"))
    .then((user) => {
      return res.send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  return bcrypt.hash(password, 10).then((hash) => {
    return User.create({ name, about, avatar, email, password: hash })
      .then((user) => {
        const { name, about, avatar, email } = user;
        return res.status(STATUS_CODE_201).send({ name, about, avatar, email });
      })
      .catch(next);
  });
};

module.exports.patchUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(new Error("Пользователь с указанным _id не найден"))
    .then((user) => {
      return res.send(user);
    })
    .catch(next);
};

module.exports.patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(new Error("Пользователь с указанным _id не найден"))
    .then((user) => {
      return res.send({ user });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnAuthorizedError(
            "Пользователь не найден или введен неверный пароль"
          )
        );
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnAuthorizedError(
              "Пользователь не найден или введен неверный пароль"
            )
          );
        }
        const payload = { _id: user._id };
        const token = jwt.sign(
          payload,
          NODE_ENV === "production" ? JWT_SECRET : "some-secret-key"
        );

        res.status(STATUS_CODE_200).send({ token });
      });
    })
    .catch(next);
};

module.exports.userMe = (req, res, next) => {
  const { _id } = req.user;

  User.findOne({ _id })
    .orFail(new Error("Пользователь с указанным id не найден"))
    .then((user) => {
      res.status(STATUS_CODE_200).send(user);
    })
    .catch(next);
};
