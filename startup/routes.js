const { users, brand } = require("./../routes");

module.exports = function (app) {
  //----------------------------------
  app.use("/api/user", users);
  app.use("/api/brand", brand);
  //----------------------------------
};
