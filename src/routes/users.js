const router = require('express').Router();
const reqParamsUserIdSchema = require('../schemaValidator/reqParamsUserId');

const {
  getUser,
  getUsers,
  patchUser,
  patchUserAvatar,
  userMe,
} = require('../controllers/users');
const patchUserSchema = require('../schemaValidator/patchUser');
const patchAvatarSchema = require('../schemaValidator/patchAvatar');

router.get('/users', getUsers);
router.get('/users/me', userMe);
router.get('/users/:userId', reqParamsUserIdSchema, getUser);
router.patch('/users/me', patchUserSchema, patchUser);
router.patch('/users/me/avatar', patchAvatarSchema, patchUserAvatar);

module.exports = router;
