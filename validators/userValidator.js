const Joi = require("joi");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const utils = require("utils");


// Schema for validating user creation
const createUserSchema = Joi.object({
  name: Joi.string().max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().max(255).required(),
  gender_id: Joi.number().required(),
  role_id: Joi.number().required(),
  dob: Joi.date().iso().required(),
  is_active: Joi.boolean().required(),
  is_verified: Joi.boolean().required(),
});

exports.validateCreateUser = async (req, res, next) => {
  req.body.is_active = true;
  req.body.is_verified = false; // wait for click email link

  await utils.validateSchema(createUserSchema, req, res, next);
};

// Schema for validating user login
const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().max(255).required(),
});

exports.validateUserLogin = async (req, res, next) => {
  await utils.validateSchema(userLoginSchema, req, res, next);
};
