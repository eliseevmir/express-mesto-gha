const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const {
  STATUS_CODE_200,
  STATUS_CODE_201,
  STATUS_CODE_409,
} = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');
const UnAuthorizedError = require('../errors/UnAuthorized');
const BadRequestError = require('../errors/BadRequestError');

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (err) {
    return next(err);
  }
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  return bcrypt.hash(password, 10).then((hash) => User.create({
    name,
    about,
    avatar,
    email,
    password: hash,
  })
    .then((user) => {
      // eslint-disable-next-line no-shadow
      const { password, ...userData } = user._doc;
      return res.status(STATUS_CODE_201).send(userData);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(STATUS_CODE_409).send({ message: 'Пользователь с указанным email существует' });
      }
      return next(err);
    }));
};

module.exports.patchUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        throw new BadRequestError('Не вернные данные');
      }
      next(err);
    });
};

module.exports.patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        throw new BadRequestError('Не вернные данные');
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnAuthorizedError(
            'Пользователь не найден или введен неверный пароль',
          ),
        );
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnAuthorizedError(
              'Пользователь не найден или введен неверный пароль',
            ),
          );
        }
        const payload = { _id: user._id };
        const token = jwt.sign(
          payload,
          NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
          { expiresIn: '7d' },
        );

        return res.status(STATUS_CODE_200).send({ token });
      });
    })
    .catch(next);
};

module.exports.userMe = (req, res, next) => {
  const { _id } = req.user;

  User.findOne({ _id })
    .orFail(new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => {
      res.status(STATUS_CODE_200).send(user);
    })
    .catch(next);
};
