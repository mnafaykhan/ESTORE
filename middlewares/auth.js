const jwt = require("jsonwebtoken");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const ErrorResponse = require("../composer/error-response");
const userService = require("../services/database/userService");

exports.auth = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(HttpCodes.FORBIDDEN)
      .send(new ErrorResponse(AppMessages.APP_ACCESS_DENIED));
  }
  try {
    const decoded = jwt.verify(token, process.env.NODE_SECRET_KEY);

    // Set User Details: Upon successful token verification, the decoded payload (which represents the user's details) is assigned to req.user. This effectively "logs in" the user for the scope of this request, making their details available to subsequent middleware or request handlers.
    req.user = decoded;

    // const user = await userService.getUserByEmail(req.user.email);
    //console.log("Request is from User: ", user.dataValues);
    if (!req.user) {
      return res
        .status(HttpCodes.FORBIDDEN)
        .send(new ErrorResponse(AppMessages.INVALID_USER_CREDENTIALS));
    }

    next();
  } catch (error) {
    // If any error occurs during the token verification process (e.g., if the token is invalid, expired, or tampered with), a catch block captures the error. 
    console.error(error);

    return res
      .status(HttpCodes.FORBIDDEN)
      .send(new ErrorResponse(AppMessages.APP_ACCESS_DENIED));
  }
};

exports.authEmail = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(HttpCodes.FORBIDDEN)
      .send(new ErrorResponse(AppMessages.APP_ACCESS_DENIED));
  }
  try {
    const decoded = jwt.verify(token, process.env.NODE_SECRET_KEY);
    req.user = decoded;
    req.body.role = req.user.role;
    next();
  } catch (error) {
    return res
      .status(HttpCodes.FORBIDDEN)
      .send(new ErrorResponse(AppMessages.APP_ACCESS_DENIED));
  }
};
