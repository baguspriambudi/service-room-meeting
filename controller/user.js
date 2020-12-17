const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const pify = require('pify');
const fs = require('fs');
const Joi = require('joi');
require('dotenv').config();
const User = require('../models/user');
const {
  httpOkResponse,
  httpAuthenticationFailed,
  httpNotFound,
  httpValidasiDataErrorRespone,
} = require('../helper/http_respone');

const JWTsekret = process.env.JWT_KEY;

cloudinary.config({
  cloud_name: process.env.NAME_CLOUD,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = multer.diskStorage({
  destination: '../app/tmp/upload',
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
    // upload file in cloudinary
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

    // get data file url
    const image = await getUrl();
    const { email, password, role } = req.body;
    // validation body is required
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }).options({ abortEarly: false });

    const { error } = schema.validate(req.body);

    if (error) {
      return httpValidasiDataErrorRespone(res, error.details);
    }
    // find user has been register
    const findUser = await User.findOne({ where: { email: email } });
    if (findUser) {
      return httpAuthenticationFailed(res, 'user has been register');
    }
    // encrypt password
    const passwordHash = bcrypt.hashSync(password, 10);
    // insert data user
    const user = await User.create({ email, password: passwordHash, photo: image, role });
    httpOkResponse(res, 'success created user', user);
  } catch (error) {
    // handle error upload in cloudinary
    if (error instanceof multer.MulterError) {
      return res.status(400).json({ status: 400, error: error.message });
    }
    // handle file image .png .jpg and .jpeg
    if (req.fileValidationError) {
      // eslint-disable-next-line no-undef
      return res.status(400).json({ status: 400, error: req.fileValidationError });
    }
    // handle file is required
    if (!req.file) {
      return res.status(400).json({ status: 400, error: 'please input file' });
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const login = await User.findOne({ where: { email: email } });
    if (!login) {
      return httpNotFound(res, 'username not found');
    }
    const compare = bcrypt.compareSync(password, login.password);
    if (!compare) {
      return httpAuthenticationFailed(res, 'password not match');
    }
    const token = JWT.sign({ id: login.id, role: login.role }, JWTsekret, { expiresIn: '24h' });
    httpOkResponse(res, 'succes login', token);
  } catch (error) {
    next(error);
  }
};
