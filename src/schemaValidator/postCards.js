const { celebrate, Joi } = require('celebrate');
const { LINKREGEXP } = require('../utils/constants');

module.exports = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.base': 'Только строка',
        'string.empty': 'Не пустая строка',
        'string.min': 'В поле name должго быть минимум 2 символа',
        'string.max': 'В поле name должно быть максимум 30 символов',
        'any.required': 'Поле обязательное',
      }),
    link: Joi.string().required().pattern(new RegExp(LINKREGEXP)).messages({
      'string.pattern.base': 'Некорректная ссылка на изображение',
      'any.required': 'Ссылка обязательна',
    }),
  }),
});
