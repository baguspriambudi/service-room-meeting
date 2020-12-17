const express = require('express');

const bookingController = require('../controller/create_booking');
const auth = require('../middleware/auth');

const router = express.Router();
router.post('/create', auth.isGuest, bookingController.bookingCreate);

module.exports = router;
