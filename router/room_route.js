const express = require('express');

const roomController = require('../controller/room');
const auth = require('../middleware/auth');

const router = express.Router();
router.post('/create', auth.isAdmin, roomController.createRoom);
router.get('/show', auth.isGuest, roomController.showRooms);

module.exports = router;
