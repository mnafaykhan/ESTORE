const Joi = require("joi");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");

let validateCreateUser = async (req, res, next) => {
  let { body } = req;

  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().max(255).required(),
    gender_id: Joi.number().required(),
    role_id: Joi.number().required(),
    dob: Joi.date().iso().required(),
    is_active: Joi.boolean().required(),
    is_verified: Joi.boolean().required(),
  });

  try {
    req.body.is_active = true;
    req.body.is_verified = false;
    await schema.validateAsync(body);
    next();
  } catch (error) {
    return res.status(HttpCodes.FORBIDDEN).json({
      Message: error.message,
    });
  }
};

let validateUserLogin = async (req, res, next) => {
  let { body } = req;
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().max(255).required(),
  });

  try {
    await schema.validateAsync(body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(HttpCodes.FORBIDDEN).json({
      Message: error.message,
    });
  }
};

let userValidator = {
  validateCreateUser,
  validateUserLogin,
};

module.exports = userValidator;
