const jwt = require("jsonwebtoken");

const { JWT_SECRET, NODE_ENV } = process.env;
const { STATUS_CODE_401 } = require("../utils/constants");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(STATUS_CODE_401)
      .send({ message: "Необходима авторизация" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "some-secret-key"
    );
  } catch (err) {
    return res
      .status(STATUS_CODE_401)
      .send({ message: "Необходима авторизация" });
  }

  req.user = payload;
  next();
};
