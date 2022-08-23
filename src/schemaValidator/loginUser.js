const { celebrate, Joi } = require("celebrate");

module.exports = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});
