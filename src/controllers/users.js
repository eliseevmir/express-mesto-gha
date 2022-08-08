const User = require("../models/user");
const errors = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      return res.send({ users });
    })
    .catch((error) => {
      return errors({
        res,
        statusCode: 404,
        message: "Пользователи не найдены",
      });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      return res.send({ user });
    })
    .catch((error) => {
      return errors({
        error,
        res,
        statusCode: 404,
        message: "Пользователь не найден",
      });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      return res.send({ user: user });
    })
    .catch((error) => {
      return errors({
        res,
        statusCode: 400,
        message: "Переданы некорректные данные при создании пользователя",
      });
    });
};

module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      res.send({ user });
    })
    .catch((error) => {
      return errors({
        res,
        statusCode: 500,
        message: "Переданы некорректные данные при обновлении профиля",
      });
    });
};

module.exports.patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      res.send({ user: user });
    })
    .catch((error) => {
      return errors({
        res,
        statusCode: 500,
        message: "Переданы некорректные данные при обновлении аватара",
      });
    });
};
