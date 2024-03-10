const { Sequelize } = require("sequelize");

const config = {
  host: process.env.DB_HOST_NAME,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  dialect: "mysql",
  logging: false, // Turn off logging
};
// Create a Sequelize instance
const sequelize = new Sequelize(config);

module.exports = sequelize;
