const express = require('express');

const { celebrate, Joi } = require('celebrate');

const router = express.Router();

const { getUser, patchUserMe } = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
  }),
}), patchUserMe);

module.exports = router;
