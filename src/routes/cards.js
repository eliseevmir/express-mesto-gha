const router = require("express").Router();
const {
  getCards,
  postCard,
  deleteCard,
  putLikeCard,
  putDislikeCard,
} = require("../controllers/cards");
const reqParamsCardIdSchema = require("../schemaValidator/reqParamsCardId.js");
const postCardsSchema = require("../schemaValidator/postCards.js");

router.get("/cards", getCards);
router.post("/cards", postCardsSchema, postCard);
router.delete("/cards/:cardId", reqParamsCardIdSchema, deleteCard);
router.put("/cards/:cardId/likes", reqParamsCardIdSchema, putLikeCard);
router.delete("/cards/:cardId/likes", reqParamsCardIdSchema, putDislikeCard);

module.exports = router;
