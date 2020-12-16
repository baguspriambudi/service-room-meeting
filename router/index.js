const express = require('express');

const user = require('./user_route');
const room = require('./room_route');

const router = express.Router();
router.use('/user', user);
router.use('/room', room);

module.exports = router;
