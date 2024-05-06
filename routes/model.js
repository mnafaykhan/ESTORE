const express = require("express");
const router = express.Router();

const { roleCheck, auth } = require("../middlewares");
const { modelValidator } = require("../validators");
const { modelController } = require("../controllers");

router.post(
  "/addModel",
  [auth, roleCheck(["admin"]), modelValidator.validateModelAddition],
  modelController.addModel
);

router.post(
  "/updateModel",
  [auth, roleCheck(["admin"]), modelValidator.validateModelUpdation],
  modelController.updateModel
);

router.post(
  "/deleteModel",
  [auth, roleCheck(["admin"]), modelValidator.validateModelDeletion],
  modelController.deleteModel
);

router.get("/listModels", modelController.listModels);

router.get(
  "/listModelsForAdmin",
  [auth, roleCheck(["admin"])],
  modelController.listModels
);

router.post(
  "/acivateModel",
  [auth, roleCheck(["admin"]), modelValidator.validateModelActivation],
  modelController.activateModel
);
<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> e1831d631d8eaffe66633caa97efc0676a5be9e6
