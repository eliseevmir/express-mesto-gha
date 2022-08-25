const { celebrate, Joi } = require('celebrate');
const { LINKREGEXP } = require('../utils/constants');

module.exports = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(new RegExp(LINKREGEXP)).messages({
      'string.pattern.base': 'Неверная ссылка',
      'any.required': 'ССылка обязательна',
    }),
  }),
});
