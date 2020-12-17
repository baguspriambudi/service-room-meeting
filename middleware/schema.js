const Joi = require('joi');
const { httpValidasiDataErrorRespone } = require('../helper/http_respone');

exports.midRegister = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).options({ abortEarly: false });

  const { error } = schema.validate(req.body);
  if (error) {
    return httpValidasiDataErrorRespone(res, error.details);
  }
  next();
};

exports.midBooking = (req, res, next) => {
  const schema = Joi.object({
    room: Joi.number().required(),
    time: Joi.date().required(),
    noted: Joi.string().allow(''),
    total: Joi.number().required(),
  }).options({ abortEarly: false });

  const { error } = schema.validate(req.body);
  if (error) {
    return httpValidasiDataErrorRespone(res, error.details);
  }
  next();
};

exports.midCheckIn = (req, res, next) => {
  const schema = Joi.object({
    room: Joi.number().required(),
  }).options({ abortEarly: false });

  const { error } = schema.validate(req.body);
  if (error) {
    return httpValidasiDataErrorRespone(res, error.details);
  }
  next();
};
