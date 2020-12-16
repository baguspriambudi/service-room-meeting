const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const pify = require('pify');
const fs = require('fs');
require('dotenv').config();
const Room = require('../models/room');
const { httpOkResponse, httpAuthenticationFailed } = require('../helper/http_respone');

cloudinary.config({
  cloud_name: process.env.NAME_CLOUD,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = multer.diskStorage({
  destination: '../upload',
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = pify(
  multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
      } else {
        cb(null, false);
        req.fileValidationError = 'Only .png, .jpg, and .jpeg format allowed!';
      }
    },
    limits: { fileSize: 1024 * 1024 * 2 },
  }).single('file'),
);

exports.createRoom = async (req, res, next) => {
  try {
    await upload(req, res);
    const { path } = req.file;
    const uploadPreset = 'uploader';

    const getUrl = async () => {
      let data;
      await cloudinary.uploader.unsigned_upload(path, uploadPreset, (err, result) => {
        fs.unlinkSync(path);
        data = result.secure_url;
      });
      return data;
    };

    const image = await getUrl();
    const { name, capacity } = req.body;
    const roomName = await Room.findOne({ where: { name } });
    if (roomName) {
      return httpAuthenticationFailed(res, 'room is already use');
    }
    const room = await Room.create({ name, capacity, photo: image });
    httpOkResponse(res, 'success created room', room);
  } catch (error) {
    if (error instanceof multer.MulterError) {
      return res.status(400).json({ status: 400, error: error.message });
    }
    if (req.fileValidationError) {
      // eslint-disable-next-line no-undef
      return res.status(400).json({ status: 400, error: req.fileValidationError });
    }
    if (!req.file) {
      return res.status(400).json({ status: 400, error: 'please input file' });
    }
    next(error);
  }
};
