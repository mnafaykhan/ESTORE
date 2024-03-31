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
module.exports = router;
