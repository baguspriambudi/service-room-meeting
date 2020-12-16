const express = require('express');

const userController = require('../controller/user');
// const auth = require('../middleware/auth');
// const schema = require('../middleware/schema');

const router = express.Router();
router.post('/create', userController.createUser);
router.post('/login', userController.login);

module.exports = router;
