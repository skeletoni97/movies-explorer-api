const {
  INTERNAL_SERVER_ERROR,
} = require('../utils/constant');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || INTERNAL_SERVER_ERROR;
  res.status(statusCode).send({ message });
  next();
};

module.exports = { errorHandler };
