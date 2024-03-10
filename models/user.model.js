const { DataTypes } = require("sequelize");
const sequelize = require("./../config/mysqlConnect"); // Assuming you have a Sequelize instance in config.js
const Gender = require("./gender.model");
const Role = require("./role.model");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER, // Changed to DataTypes.INTEGER
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, // Specify auto-increment
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Gender, // This references the Gender model
        key: "id", // The primary key of the Gender model
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role, // This references the Role model
        key: "id", // The primary key of the Role model
      },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "users",
  }
);



// Define associations
User.belongsTo(Gender, { foreignKey: 'gender_id', as: 'gender' }); // A user belongs to a gender
Gender.hasMany(User, { foreignKey: 'gender_id', as: 'users' }); // A gender can have many users

User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' }); // A user belongs to a role
Role.hasMany(User, { foreignKey: 'role_id', as: 'users' }); // A role can have many users


module.exports = User;
