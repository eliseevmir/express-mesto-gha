const { celebrate, Joi } = require('celebrate');

module.exports = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required()
      .messages({
        'string.base': 'Только строка',
        'string.empty': 'Не пустая строка',
        'any.required': 'Поле обязательное',
        'string.length': 'Длина строки должна быть 24 символа',
        'string.hex': 'Только hex',
      }),
  }),
});
