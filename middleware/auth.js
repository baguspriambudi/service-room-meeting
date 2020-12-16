const JWT = require('jsonwebtoken');
const User = require('../models/user');

const JWTsecret = process.env.JWT_KEY;
const {
  httpUnauthorizedRespone,
  httpNotFound,
  httpValidasiErroResponse,
  httpValidasiDataErrorRespone,
} = require('../helper/http_respone');

exports.isAdmin = async (req, res, next) => {
  try {
    const headers = req.headers.authorization;
    if (!headers) {
      return httpUnauthorizedRespone(res, 'please provide token');
    }

    const token = headers.split(' ')[1];
    const decode = JWT.verify(token, JWTsecret);
    req.user = decode;

    const admin = await User.findById({ _id: req.user._id });
    if (!admin) {
      return httpNotFound(res, 'User not found');
    }
    if (req.user.role !== 'admin') {
      return httpValidasiErroResponse(res, 'User is not acces');
    }
    next();
  } catch (error) {
    return httpValidasiDataErrorRespone(res, error.message);
  }
};

exports.isGuest = async (req, res, next) => {
  try {
    const headers = req.headers.authorization;
    if (!headers) {
      return httpUnauthorizedRespone(res, 'please provide token');
    }

    const token = headers.split(' ')[1];
    const decode = JWT.verify(token, JWTsecret);
    req.user = decode;

    const admin = await User.findById({ _id: req.user._id });
    if (!admin) {
      return httpNotFound(res, 'User not found');
    }
    if (req.user.role !== 'guest') {
      return httpValidasiErroResponse(res, 'User is not acces');
    }
    next();
  } catch (error) {
    return httpValidasiDataErrorRespone(res, error.message);
  }
};
