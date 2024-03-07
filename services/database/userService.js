const { UserModel, GenderModel, RoleModel } = require("./../../models");
const HttpCodes = require("../../constants/httpCodes");
const AppMessages = require("../../constants/appMessages");

exports.getUserByEmail = async (email) => {
  const user = await UserModel.findOne({
    where: {
      email,
      is_active: true,
    },
    attributes: ["id", "name", "email", "password", "role_id", "dob"],
    include: [
      {
        model: GenderModel,
        attributes: ["type"],
        as: "gender",
        where: {
          is_active: true,
        },
      },
    ],
  });
  return user;
};

exports.createUserAccount = async (body) => {
  let exists = await this.getUserByEmail(body.email);
  if (exists) {
    throw new Error("User already exists"
    );
  }
  const newUser = await UserModel.create({ ...body });
  return newUser;
};
