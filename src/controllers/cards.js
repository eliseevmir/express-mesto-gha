const Card = require('../models/card');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

module.exports.postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError('Карточка с указанным _id не найдена'))
    .then((card) => {
      const owner = card.owner.valueOf();

      if (owner !== req.user._id) {
        throw new ForbiddenError('Карточка добавлена другим пользователем');
      }

      return Card.findByIdAndRemove(req.params.cardId).then((cardDate) => res.send(cardDate));
    })
    .catch(next);
};

module.exports.putLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка по указанному id не найдена'))
    .then((card) => res.send({ card }))
    .catch(next);
};

module.exports.putDislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка по указанному id не найдена'))
    .then((card) => res.send({ card }))
    .catch(next);
};
