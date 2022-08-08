const router = require("express").Router();
const {
  getCards,
  postCard,
  deleteCard,
  putLikeCard,
  putDislikeCard,
} = require("../controllers/cards");

router.get("/cards", getCards);
router.post("/cards", postCard);
router.delete("/cards/:cardId", deleteCard);
router.put("/cards/:cardId/likes", putLikeCard);
router.delete("/cards/:cardId/likes", putDislikeCard);

module.exports = router;
