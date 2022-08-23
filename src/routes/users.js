const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getUser,
  getUsers,
  patchUser,
  patchUserAvatar,
  userMe,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/me", userMe);
router.get("/users/:userId", getUser);
router.patch(
  "/users/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  patchUser
);
router.patch(
  "/users/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required(),
    }),
  }),
  patchUserAvatar
);

module.exports = router;
