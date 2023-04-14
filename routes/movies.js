const express = require('express');
const { getMovies, postMovies, deleteMovies } = require('../controllers/movies');
const { validatePostMovies, validateCardId } = require('../middlewares/validation');

const router = express.Router();
router.get('/', getMovies);
router.post('/', validatePostMovies, postMovies);
router.delete('/:cardId', validateCardId, deleteMovies);

module.exports = router;
