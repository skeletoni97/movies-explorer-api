const express = require('express');
const { PAGE_NOT_FOUND } = require('../utils/constant');

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

router.all('*', (req, res, next) => {
  next(new NotFoundError(PAGE_NOT_FOUND));
});

module.exports = router;
