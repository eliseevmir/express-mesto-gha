const User = require("../models/user");
const {
  STATUS_CODE_400,
  STATUS_CODE_404,
  STATUS_CODE_500,
} = require("../utils/constants");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      return res.send({ users });
    })
    .catch((err) => {
      return res
        .status(STATUS_CODE_500)
        .send({ message: "Ошибка по умолчанию" });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      return res.send({ user });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res
          .status(STATUS_CODE_404)
          .send({ message: "Пользователь по указанному _id не найден" });
      }
      return res(STATUS_CODE_500).send({ message: "Ошибка по умолчанию" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(STATUS_CODE_400).send({
          message: "Переданы некорректные данные при создании пользователя",
        });
      }
      return res
        .status(STATUS_CODE_500)
        .send({ message: "Ошибка по умолчанию" });
    });
};

module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw Error("Пользователь с указанным _id не найден");
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(STATUS_CODE_400).send({
          message: "Переданы некорректные данные при обновлении профиля",
        });
      }
      if (err.name === "Error") {
        return res.status(STATUS_CODE_404).send({ message: err.message });
      }
      return res
        .status(STATUS_CODE_500)
        .send({ message: "Ошибка по умолчанию" });
    });
};

module.exports.patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw Error("Пользователь с указанным _id не найден");
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(STATUS_CODE_400).send({
          message: "Переданы некорректные данные при обновлении аватара",
        });
      }
      if (err.name === "Error") {
        return res.status(STATUS_CODE_404).send({ message: err.message });
      }
      return res
        .status(STATUS_CODE_500)
        .send({ message: "Ошибка по умолчанию" });
    });
};
