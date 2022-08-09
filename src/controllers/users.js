const User = require("../models/user");
const mongoose = require("mongoose");
const checkUserData = require("../utils/checkUser");

const {
  STATUS_CODE_400,
  STATUS_CODE_404,
  STATUS_CODE_500,
} = require("../utils/constants");

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.send({ users });
  } catch (err) {
    return res.status(STATUS_CODE_500).send({ message: "Ошибка по умолчанию" });
  }
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res
          .status(STATUS_CODE_404)
          .send({ message: "Пользователь по указанному _id не найден" });
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res
          .status(STATUS_CODE_400)
          .send({ message: "Данные введены некорректно" });
      }
      return res(STATUS_CODE_500).send({ message: "Ошибка по умолчанию" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  const { check, errors } = checkUserData({ name, about });
  if (!check) {
    return res.status(STATUS_CODE_400).send({ message: errors[0] });
  }

  User.create({ name, about, avatar })
    .then((user) => {
      return res.send({ user });
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(STATUS_CODE_500)
        .send({ message: "Ошибка по умолчанию" });
    });
};

module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;

  const { check, errors } = checkUserData({ name, about });
  if (!check) {
    return res.status(STATUS_CODE_400).send({ message: errors[0] });
  }

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res
          .status(STATUS_CODE_404)
          .send({ message: "Пользователь с указанным _id не найден" });
      }
      return res.send({ user });
    })
    .catch((err) => {
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
        res
          .status(STATUS_CODE_404)
          .send({ message: "Пользователь с указанным _id не найден" });
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res.status(STATUS_CODE_400).send({
          message: "Переданы некорректные данные при обновлении аватара",
        });
      }
      return res
        .status(STATUS_CODE_500)
        .send({ message: "Ошибка по умолчанию" });
    });
};
