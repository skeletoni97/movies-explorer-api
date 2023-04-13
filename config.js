require('dotenv').config();

const { JWT_SECRET = 'JWT_SECRET' } = process.env;
const { PORT = '3000' } = process.env;
const { DATABASE_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const validatorUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

module.exports = {
  JWT_SECRET,
  PORT,
  DATABASE_URL,
  validatorUrl,
};
