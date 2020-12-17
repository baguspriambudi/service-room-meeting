const express = require('express');

const user = require('./user_route');
const room = require('./room_route');
const booking = require('./booking_route');

const router = express.Router();
router.use('/user', user);
router.use('/room', room);
router.use('/booking', booking);

module.exports = router;
