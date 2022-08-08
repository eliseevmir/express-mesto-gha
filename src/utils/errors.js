const errors = (props) => {
  const { statusCode, error, res, message } = props;

  console.log(error.prototype);
  return res.status(statusCode).send({ error: true, message });
};

module.exports = errors;
