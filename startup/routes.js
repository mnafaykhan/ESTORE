const { users, brand, model, category, product } = require("./../routes");

module.exports = function (app) {
  //----------------------------------
  app.use("/api/user", users);
  app.use("/api/brand", brand);
  app.use("/api/model", model);
  app.use("/api/category", category);
  app.use("/api/product", product);
  //----------------------------------
};
