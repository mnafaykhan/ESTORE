const Joi = require("joi");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const ErrorResponse = require("../composer/error-response");
const utils = require("utils");

exports.validateModelAddition = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    is_active: Joi.boolean().default(true).required(),
  });

  await utils.validateSchema(schema, req, res, next);
};

exports.validateModelUpdation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    newName: Joi.string().max(255).required(),
  });

  await utils.validateSchema(schema, req, res, next);
};

exports.validateModelDeletion = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
  });

  await utils.validateSchema(schema, req, res, next);
};

exports.validateModelActivation = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().max(255).required(),
  });

  await utils.validateSchema(schema, req, res, next);
};
