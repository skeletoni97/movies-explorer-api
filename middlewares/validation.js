const { celebrate, Joi } = require('celebrate');
const { validatorUrl } = require('../utils/constant');

const validatePostMovies = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(validatorUrl),
    trailerLink: Joi.string().pattern(validatorUrl),
    thumbnail: Joi.string().pattern(validatorUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

const validatePatchUserMe = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
});

module.exports = { validatePostMovies, validateCardId, validatePatchUserMe };
