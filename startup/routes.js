const { users, brand, model } = require("./../routes");

module.exports = function (app) {
  //----------------------------------
  app.use("/api/user", users);
  app.use("/api/brand", brand);
  app.use("/api/model", model);
  //----------------------------------
};
