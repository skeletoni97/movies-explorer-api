const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const Movie = require('../models/movie');
const {
  INVALID_CARD_DATA_ERROR,
  INVALID_CARD_ID_ERROR,
  INSUFFICIENT_PERMISSIONS_ERROR,
  NONEXISTENT_CARD_ID_ERROR,
  CARD_DELETED_SUCCESSFULLY_MESSAGE,
} = require('../utils/constant');

module.exports.getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId })
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

module.exports.postMovies = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INVALID_CARD_DATA_ERROR));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovies = (req, res, next) => {
  const { cardId } = req.params;
  if (!ObjectId.isValid(cardId)) {
    return next(new BadRequestError(INVALID_CARD_ID_ERROR));
  }

  return Movie.findById(cardId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(NONEXISTENT_CARD_ID_ERROR));
      }
      if (movie.owner._id.toString() !== req.user._id.toString()) {
        return next(new ForbiddenError(INSUFFICIENT_PERMISSIONS_ERROR));
      }
      return movie.deleteOne().then(() => res.send({ massage: CARD_DELETED_SUCCESSFULLY_MESSAGE }));
    })
    .catch((err) => next(err));
};
