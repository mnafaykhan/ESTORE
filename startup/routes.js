<<<<<<< HEAD
const { users, brand, model } = require("./../routes");
=======
const { users, brand, model, category } = require("./../routes");
>>>>>>> e1831d631d8eaffe66633caa97efc0676a5be9e6

module.exports = function (app) {
  //----------------------------------
  app.use("/api/user", users);
  app.use("/api/brand", brand);
  app.use("/api/model", model);
<<<<<<< HEAD
=======
  app.use("/api/category", category);
>>>>>>> e1831d631d8eaffe66633caa97efc0676a5be9e6
  //----------------------------------
};
