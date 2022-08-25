const { celebrate, Joi } = require('celebrate');
const { LINKREGEXP, EMAILREGEXP } = require('../utils/constants');

module.exports = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string()
      .optional()
      .default(
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      )
      .pattern(new RegExp(LINKREGEXP)),
    email: Joi.string()
      .required()
      .pattern(new RegExp(EMAILREGEXP))
      .messages({
        'string.pattern.base': 'Некорректный email',
        'any.required': 'Email обязателен',
      }),
    password: Joi.string().required(),
  }),
});
