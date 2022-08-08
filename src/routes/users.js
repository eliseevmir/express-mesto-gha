const router = require("express").Router();
const {
  getUser,
  getUsers,
  createUser,
  patchUser,
  patchUserAvatar,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/:userId", getUser);
router.post("/users", createUser);
router.patch("/users/me", patchUser);
router.patch("/users/me/avatar", patchUserAvatar);

module.exports = router;
