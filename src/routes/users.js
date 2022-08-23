const router = require("express").Router();

const {
  getUser,
  getUsers,
  patchUser,
  patchUserAvatar,
  userMe,
} = require("../controllers/users");
const patchUserSchema = require("../schemaValidator/patchUser.js");
const patchAvatarSchema = require("../schemaValidator/patchAvatar.js");

router.get("/users", getUsers);
router.get("/users/me", userMe);
router.get("/users/:userId", getUser);
router.patch("/users/me", patchUserSchema, patchUser);
router.patch("/users/me/avatar", patchAvatarSchema, patchUserAvatar);

module.exports = router;
