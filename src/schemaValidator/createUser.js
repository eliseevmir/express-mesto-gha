const { celebrate, Joi } = require("celebrate");
const { LINKREGEXP } = require("../utils/constants");

module.exports = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(LINKREGEXP)),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});
