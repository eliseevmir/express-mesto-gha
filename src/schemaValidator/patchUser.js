const { celebrate, Joi } = require('celebrate');

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
    about: Joi.string().required().min(2).max(30)
      .messages({
        'string.base': 'Только строка',
        'string.empty': 'Не пустая строка',
        'string.min': 'В поле about должго быть минимум 2 символа',
        'string.max': 'В поле about должно быть максимум 30 символов',
        'any.required': 'Поле обязательное',
      }),
  }),
});
