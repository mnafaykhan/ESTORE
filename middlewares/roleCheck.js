const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const ErrorResponse = require("../composer/error-response");
const { findRole } = require("../services/database/roleService");

exports.roleCheck = (roles = []) => {
  return async (req, res, next) => {
    console.log("req.user in roleCheck ", req.user);
    const role_id = req.body?.role_id || req.user?.role_id;
    console.log("RoleId ", role_id);
    let userRole;
    try {
      userRole =(await findRole(role_id)).dataValues.role_type;
    } catch (err) {
      console.error(err);

      return res
        .status(HttpCodes.FORBIDDEN)
        .send(new ErrorResponse(err.message));
    }
    console.log("userRole ", userRole);

    req.user.role = userRole;
    const roleSet = new Set(roles.map (role => role.toLowerCase())); // why set?
    console.error("req.user.role: ", req.user.role);
    console.error("roleSet: ", roleSet);

    if (!userRole || !roleSet.has(userRole)) {
      return res
        .status(HttpCodes.FORBIDDEN)
        .send(new ErrorResponse(AppMessages.APP_ACCESS_DENIED));
    }
    next();
  };
};
