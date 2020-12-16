const express = require('express');

const userController = require('../controller/user');
const schema = require('../middleware/schema');

const router = express.Router();
router.post('/create', userController.createUser);
router.post('/login', schema.midRegister, userController.login);

module.exports = router;
