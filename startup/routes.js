<<<<<<< Updated upstream
const { users, brand } = require("./../routes");
=======
const { users, brand, model, category } = require("./../routes");
>>>>>>> Stashed changes

module.exports = function (app) {
  //----------------------------------
  app.use("/api/user", users);
  app.use("/api/brand", brand);
<<<<<<< Updated upstream
=======
  app.use("/api/model", model);
  app.use("/api/category", category);
>>>>>>> Stashed changes
  //----------------------------------
};
