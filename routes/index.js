const express = require('express');

const router = express.Router();
// const path = require('path');
const {
  celebrate, Joi,
} = require('celebrate');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.all(auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
