const express = require('express');
const helmet = require('helmet');
// const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { apiLimiter } = require('./middlewares/rateLimiter');
const { PORT, DATABASE_URL } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errors-handler');
const { MONGODB_CONNECTED, MONGODB_ERROR } = require('./utils/constant');

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log(MONGODB_CONNECTED);
  })
  .catch((err) => {
    console.error(MONGODB_ERROR, err);
    process.exit(1);
  });

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(requestLogger);

app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);
app.use(apiLimiter);
app.listen(PORT, () => {
  console.log('privet');
});
