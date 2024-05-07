const Joi = require("joi");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const ErrorResponse = require("../composer/error-response");
const utils = require("utils");


exports.validateBrandAddition = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    image_url: Joi.string().required(),
    is_active: Joi.boolean().default(true).required(),
  });

  // Sanitize input data
  req.body.image_url = req.file?.filename;
  req.body.is_active = true;

  await utils.validateSchema(schema, req, res, next);
};

exports.validateBrandUpdation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    newName: Joi.string().max(255).required(),
    image: Joi.string().required(),
  });

  // Sanitize input data
  req.body.image = req.file?.filename;

  await utils.validateSchema(schema, req, res, next);
};

exports.validateBrandDeletion = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
  });

  await utils.validateSchema(schema, req, res, next);
};
