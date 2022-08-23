const Card = require("../models/card");
const ForbiddenError = require("../errors/ForbiddenError");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      return res.send({ cards });
    })
    .catch(next);
};

module.exports.postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      return res.send({ card });
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new Error("Карточка с указанным _id не найдена"))
    .then((card) => {
      const owner = card.owner.valueOf();

      if (owner !== req.user._id) {
        throw new ForbiddenError("Карточка добавлена другим пользователем");
      }

      Card.findByIdAndRemove(req.params.cardId).then((card) => {
        return res.send(card);
      });
    })
    .catch(next);
};

module.exports.putLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new Error("Карточка по указанному id не найдена"))
    .then((card) => {
      return res.send({ card });
    })
    .catch(next);
};

module.exports.putDislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new Error("Карточка по указанному id не найдена"))
    .then((card) => {
      return res.send({ card });
    })
    .catch(next);
};
