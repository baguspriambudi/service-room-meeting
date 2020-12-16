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
