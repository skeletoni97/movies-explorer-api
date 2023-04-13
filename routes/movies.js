const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { getMovies, postMovies, deleteMovies } = require('../controllers/movies');
const { validatorUrl } = require('../config');

const router = express.Router();
router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(validatorUrl),
    trailerLink: Joi.string().pattern(validatorUrl),
    thumbnail: Joi.string().pattern(validatorUrl),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), postMovies);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), deleteMovies);

module.exports = router;
