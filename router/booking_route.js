const express = require('express');

const bookingController = require('../controller/booking');
const auth = require('../middleware/auth');
const schema = require('../middleware/schema');

const router = express.Router();
router.post('/create', auth.isGuest, schema.midBooking, bookingController.bookingCreate);
router.post('/checkIn', auth.isGuest, bookingController.checkIn);

module.exports = router;
