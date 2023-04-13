const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    // .populate('owner')
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
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovies = (req, res, next) => {
  const { cardId } = req.params;
  if (!ObjectId.isValid(cardId)) {
    return next(new BadRequestError('Передан некорректный _id карточки.'));
  }

  return Movie.findById(cardId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Передан несуществующий _id карточки.'));
      }
      if (movie.owner._id.toString() !== req.user._id.toString()) {
        return next(new ForbiddenError('Недостаточно прав на удаление карточки.'));
      }
      return movie.deleteOne().then(() => res.send({ massage: 'успешно удалена.' }));
    })
    .catch((err) => next(err));
};
