// const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');

const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');
const {
  INVALID_PROFILE_DATA_ERROR,
  USER_NOT_FOUND_ERROR,
  INVALID_USER_DATA_ERROR,
  EMAIL_CONFLICT_ERROR,
  INCORRECT_EMAIL_OR_PASSWORD_ERROR,
} = require('../utils/constant');

module.exports.getUser = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .orFail(() => next(new NotFoundError(USER_NOT_FOUND_ERROR)))
    .then((users) => res.send(users))
    .catch((err) => next(err));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError(INCORRECT_EMAIL_OR_PASSWORD_ERROR));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new UnauthorizedError(INCORRECT_EMAIL_OR_PASSWORD_ERROR));
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
          return res.send({ token });
        });
    })
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({
      data: {
        name: user.name,
        email: user.email,
      },
    }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(EMAIL_CONFLICT_ERROR));
      }
      if (err.name === 'ValidationError') {
        console.log(err.name)
        return next(new BadRequestError(INVALID_USER_DATA_ERROR));
      }
      return next(err);
    });
};

module.exports.patchUserMe = (req, res, next) => {
  const userId = req.user._id;
  const { email, name } = req.body;
  User.findByIdAndUpdate(userId, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(USER_NOT_FOUND_ERROR));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(INVALID_PROFILE_DATA_ERROR));
      }
      return next(err);
    });
};
