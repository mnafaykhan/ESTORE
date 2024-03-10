const { DataTypes } = require("sequelize");
const sequelize = require("./../config/mysqlConnect"); // Assuming you have a Sequelize instance in config.js

const Gender = sequelize.define(
  "Gender",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, // Specify auto-increment
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "gender",
  }
);

module.exports = Gender;
