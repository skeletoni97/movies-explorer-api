const express = require('express');

const { validatePatchUserMe } = require('../middlewares/validation');
const { getUser, patchUserMe } = require('../controllers/users');

const router = express.Router();
router.get('/me', getUser);
router.patch('/me', validatePatchUserMe, patchUserMe);

module.exports = router;
