const Joi = require("joi");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const ErrorResponse = require("../composer/error-response");
const utils = require("utils");

exports.validateCategoryAddition = async (req, res, next) => {
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

exports.validateCategoryUpdation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().allow("").optional(),
    newName: Joi.string().when("name", {
      is: Joi.exist(),
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
  });

  await utils.validateSchema(schema, req, res, next);
};

exports.validateCategoryDeletion = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
  });

  await utils.validateSchema(schema, req, res, next);
};

exports.validateCategoryActivation = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().max(255).required(),
  });

  await utils.validateSchema(schema, req, res, next);
};
