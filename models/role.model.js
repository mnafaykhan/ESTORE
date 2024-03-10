const { DataTypes } = require("sequelize");
const sequelize = require("./../config/mysqlConnect"); // Assuming you have a Sequelize instance in config.js

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, // Specify auto-increment
    },
    role_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    // createdAt: "created_at",
    // updatedAt: "updated_at",
    tableName: "roles",
  }
);

module.exports = Role;
