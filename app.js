const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors, isCelebrateError } = require('celebrate');
const { PORT, DATABASE_URL } = require('./config');
const BadRequestError = require('./errors/BadRequestError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(requestLogger);

app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  let details;

  if (isCelebrateError(err)) {
    details = new BadRequestError(err.details.get('body'));
  } else {
    details = err;
  }

  const { statusCode = 500, message = 'На сервере произошла ошибка' } = details;
  res.status(statusCode).send({
    message,
  });
  next();
});

app.listen(PORT, () => {
  console.log('privet');
});
