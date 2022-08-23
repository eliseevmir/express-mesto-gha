const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getCards,
  postCard,
  deleteCard,
  putLikeCard,
  putDislikeCard,
} = require("../controllers/cards");

router.get("/cards", getCards);
router.post(
  "/cards",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required(),
    }),
  }),
  postCard
);
router.delete("/cards/:cardId", deleteCard);
router.put("/cards/:cardId/likes", putLikeCard);
router.delete("/cards/:cardId/likes", putDislikeCard);

module.exports = router;
