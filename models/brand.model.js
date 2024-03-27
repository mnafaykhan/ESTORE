const { DataTypes } = require("sequelize");
const sequelize = require("./../config/mysqlConnect");

const Brand = sequelize.define(
  "Brand",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    sales_volume: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    average_rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },  
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "brand",
  }
);

module.exports = Brand;
