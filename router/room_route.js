const express = require('express');

const roomController = require('../controller/room');
const auth = require('../middleware/auth');

const router = express.Router();
router.post('/create', auth.isAdmin, roomController.createRoom);

module.exports = router;
