const { UserModel, GenderModel, RoleModel } = require("./../../models");
const HttpCodes = require("../../constants/httpCodes");
const AppMessages = require("../../constants/appMessages");

exports.listUsers = async () => {
  let allUsers = await UserModel.findAll({
    where: {
      is_active: true,
    },
  });
  allUsers.map((user) => {
    delete user.dataValues.password;
    return user;
  });
  return allUsers;
};

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
        attributes: ["id"],
        as: "gender", // Align the alias with the association alias
      },
    ],
  });
  return user;
};

exports.createUserAccount = async (body) => {
  let exists = await this.getUserByEmail(body.email);
  if (exists) {
    throw new Error("User already exists");
  }
  const newUser = await UserModel.create({ ...body });
  return newUser;
};

exports.deleteUserById = exports.deleteUser = async (id) => {
  let user = await UserModel.update({ is_active: false }, { where: { id } });
  return user;
};

exports.verifyUser = async (userEmail) => {
  const upDatedUser = await UserModel.update(
    { is_verified: true },
    { where: { email: userEmail } }
  );

  return upDatedUser;
};
