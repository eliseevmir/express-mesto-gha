const mongoose = require("mongoose");
const Card = require("../models/card");
const {
  STATUS_CODE_400,
  STATUS_CODE_404,
  STATUS_CODE_500,
} = require("../utils/constants");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      return res.send({ cards });
    })
    .catch((err) => {
      return res
        .status(STATUS_CODE_500)
        .send({ message: "Ошибка по умолчанию" });
    });
};

module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      return res.send({ card });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(STATUS_CODE_400).send({
          message: "Переданы некорректные данные при создании карточки",
        });
      }
      return res
        .status(STATUS_CODE_500)
        .send({ message: "Ошибка по умолчанию" });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      return res.send({ card });
    })
    .catch((err) => {
      return res
        .status(STATUS_CODE_404)
        .send({ message: "Карточка с указанным _id не найдена" });
    });
};

module.exports.putLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      return res.send({ card });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res
          .status(STATUS_CODE_404)
          .send({ message: "Передан несуществующий _id карточки" });
      }
      return res
        .status(STATUS_CODE_500)
        .send({ message: "Ошибка по умолчанию" });
    });
};

module.exports.putDislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      return res.send({ card });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res
          .status(STATUS_CODE_404)
          .send({ message: "Передан несуществующий _id карточки" });
      }
      return res
        .status(STATUS_CODE_500)
        .send({ message: "Ошибка по умолчанию" });
    });
};
