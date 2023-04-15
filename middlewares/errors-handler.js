const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Внутренняя ошибка сервера';
  res.status(statusCode).send({ message });
  next();
};

module.exports = { errorHandler };
