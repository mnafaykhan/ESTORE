const Joi = require("joi");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const ErrorResponse = require("../composer/error-response");


const handleValidationErrors = (error, res) => {
    console.error(error.message);
    return res
        .status(HttpCodes.FORBIDDEN)
        .send(new ErrorResponse(AppMessages.APP_ERROR_INVALID_REQUEST));
};

// Common schema for handling validation errors
const validateSchema = async (schema, req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        handleValidationErrors(error, res);
    }
};

// Export the validation functions
module.exports = {
    handleValidationErrors,
    validateSchema
};
