const { celebrate, Joi } = require('celebrate');
const { EMAILREGEXP } = require('../utils/constants');

module.exports = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(new RegExp(EMAILREGEXP)).messages({
      'string.pattern.base': 'Некорректный email',
      'any.required': 'Email обязателен',
    }),
    password: Joi.string().required(),
  }),
});
