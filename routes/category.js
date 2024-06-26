const express = require("express");
const router = express.Router();

const {
  roleCheck,
  auth,
  authEmail,
  uploadImage,
  uploadImages,
} = require("../middlewares");
const { categoryValidator } = require("../validators");
const { categoryController } = require("../controllers");

router.post(
  "/addCategory",
  [
    auth,
    roleCheck(["Admin"]),
    uploadImage,
    categoryValidator.validateCategoryAddition,
  ],
  categoryController.addCategory
);

router.post(
  "/updateCategory",
  [
    auth,
    roleCheck(["Admin"]),
    uploadImage,
    categoryValidator.validateCategoryUpdation,
  ],
  categoryController.updateCategory
);

router.post(
  "/deleteCategory",
  [auth, roleCheck(["Admin"]), categoryValidator.validateCategoryDeletion],
  categoryController.deleteCategory
);
router.get("/listCategories", categoryController.listCategories);
router.get(
  "/listCategoriesForAdmin",
  [auth, roleCheck(["Admin"])],
  categoryController.listCategories
);

router.post(
  "/acivateCategory",
  [auth, roleCheck(["Admin"]), categoryValidator.validateCategoryActivation],
  categoryController.activateCategory
);
module.exports = router;
