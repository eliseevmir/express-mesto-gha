const { celebrate, Joi } = require("celebrate");
const { LINKREGEXP } = require("../utils/constants");

module.exports = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(new RegExp(LINKREGEXP)),
  }),
});
