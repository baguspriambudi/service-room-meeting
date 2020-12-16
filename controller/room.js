const Room = require('../models/room');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const pify = require('pify');
const fs = require('fs');
const { httpOkResponse, httpAuthenticationFailed, httpNotFound } = require('../helper/http_respone');

cloudinary.config({
  cloud_name: 'yourname',
  api_key: '848646876319268',
  api_secret: 'TVsH1hdS304H-k9Ee6FehpJDiw0',
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

exports.createUser = async (req, res, next) => {
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
    const { email, password, role } = req.body;
    const findUser = await User.findOne({ where: { email: email } });
    if (findUser) {
      return httpAuthenticationFailed(res, 'username already use');
    }
    const passwordHash = bcrypt.hashSync(password, 10);
    const user = await User.create({ email, password: passwordHash, photo: image, role });
    httpOkResponse(res, 'success created user', user);
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
