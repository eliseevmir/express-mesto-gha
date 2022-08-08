const mongoose = require("mongoose");
const errors = require("../utils/errors");

const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ cards });
    })
    .catch((err) => {
      return errors({
        res,
        statusCode: 500,
        message: err.message,
      });
    });
};

module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send({ card });
    })
    .catch((err) => {
      return errors({
        res,
        statusCode: 400,
        message: "Переданы некорректные данные при создании карточки.",
      });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      res.send({ card });
    })
    .catch((err) => {
      return errors({
        res,
        statusCode: 404,
        message: "Карточка не найдена",
      });
    });
};

module.exports.putLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      res.send({ card });
    })
    .catch((err) => {
      return errors({
        res,
        statusCode: 400,
        message: "Переданы некорректные данные для постановки/снятии лайка.",
      });
    });
};

module.exports.putDislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      res.send({ card });
    })
    .catch((err) => {
      return errors({
        res,
        statusCode: 400,
        message: "Переданы некорректные данные для постановки/снятии лайка.",
      });
    });
};
