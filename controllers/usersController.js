const userService = require("../services/database/userService");
const roleService = require("../services/database/roleService");
const authHelper = require("../helpers/authHelper");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const SuccessResponse = require("../composer/success-response");
const composeLink = require("../helpers/composeLink");
const sendEmail = require("../utils/sendEmail");


exports.listUsers = async (req, res) => {
  let users = await userService.listUsers();
  if (!users) {
    throw new ErrorResponse(
      HttpCodes.INTERNAL_SERVER_ERROR,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  } else {
    users =
      req.user?.role == "admin"
        ? users
        : users.map((item) => ({
          name: item.name,
        }));
    return res
      .status(HttpCodes.OK)
      .send(new SuccessResponse(AppMessages.SUCCESS, users));
  }
};

exports.createUser = async (req, res) => {
  try {
    let { body } = req;
    body.password = await authHelper.encryptString(body.password);
    await userService.createUserAccount(body);

    let link = await composeLink(body.email);
    await sendEmail(body.email, link);
    return res
      .status(HttpCodes.OK)
      .send(
        new SuccessResponse(
          AppMessages.SUCCESS,
          AppMessages.USER_SUCCESSFULY_REGISTERED
        )
      );
  } catch (err) {
    console.log(err);
    return res.status(HttpCodes.BAD_REQUEST).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    let { body } = req;

    let user = await userService.getUserByEmail(body.email);
    console.log('jfjkwdbvjksdbvkjsdbvsjdkvbsd\n', user)
    if (!user) {
      throw Error();
    }
    const isValidPassword = await authHelper.isValidUser(
      body.password,
      user.dataValues.password
    );
    if (isValidPassword) {
      let roleType = (await roleService.findRole(user.dataValues.role_id))
        .dataValues.role_type;
      const token = await authHelper.addAuthTokenInResponseHeader(
        {
          name: user.dataValues.name,
          email: user.dataValues.email,
          id: user.dataValues.id,
          role_id: user.dataValues.role_id,
          gender_id: user.dataValues.gender.id,
          role: roleType,
        },
        res
      );

      return res.status(HttpCodes.OK).json({
        User_details: {
          name: user.dataValues.name,
          email: user.dataValues.email,
          id: user.dataValues.id,
          role_id: user.dataValues.role_id,
          gender_id: user.dataValues.gender.id,
          dob: user.dataValues.dob,
          role: roleType,
        },

        Message: new SuccessResponse(
          AppMessages.SUCCESS,
          AppMessages.USER_SUCCESSFULY_LOGEDIN
        ),
      });
    } else {
      return res.status(HttpCodes.FORBIDDEN).json({
        status: AppMessages.FORBIDDEN,
        message: AppMessages.APP_ERROR_MSG_INVALID_USERNAME_PASSWORD,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(HttpCodes.BAD_REQUEST).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let user = await userService.deleteUserById(req.user.id);
    if (!user) {
      throw Error();
    }

    return res.status(HttpCodes.OK).json({
      user,

      Message: new SuccessResponse(
        AppMessages.SUCCESS,
        AppMessages.USER_SUCCESSFULY_DELETED
      ),
    });
  } catch (err) {
    console.log(err);
    return res.status(HttpCodes.BAD_REQUEST).json({
      status: "fail in deletion",
      message: err.message,
    });
  }
};


exports.verifyEmailAddress = async (req, res) => {
  let userEmail = req.user.email;

  let user = await userService.getUserByEmail(userEmail);
  if (!user) {
    return res.status(HttpCodes.BAD_REQUEST).json({
      status: "fail in verification",
      message: err.message,
    });  } else {
    if (user.dataValues.is_verified) {
      return res
        .status(HttpCodes.OK)
        .send(
          new SuccessResponse(
            AppMessages.SUCCESS,
            AppMessages.USER_ALREADY_VERIFIED
          )
        );
    }

    await userService.verifyUser(userEmail);
    return res
      .status(HttpCodes.OK)
      .send(
        new SuccessResponse(
          AppMessages.SUCCESS,
          AppMessages.USER_SUCCESSFULY_VERIFIED
        )
      );
  }
};