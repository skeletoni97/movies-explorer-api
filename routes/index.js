const express = require('express');

const router = express.Router();
// const path = require('path');
const { validateLogin, validateCreateUser } = require('../middlewares/validation');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.all(auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
