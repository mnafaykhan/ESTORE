const express = require("express");
const router = express.Router();

const {
  roleCheck,
  auth,
  uploadImage,
} = require("../middlewares");
const { brandValidator } = require("../validators");
const { brandController } = require("../controllers");


router.post(
  "/addBrand",
  [
    auth,
    roleCheck(["admin"]),
    uploadImage,
    brandValidator.validateBrandAddition,
  ],
  brandController.addBrand
);

router.post(
  "/updateBrand",
  [
    auth,
    roleCheck(["Admin"]),
    uploadImage,
    brandValidator.validateBrandUpdation,
  ],
  brandController.updateBrand
);

router.post(
  "/deleteBrand",
  [auth, roleCheck(["Admin"]), brandValidator.validateBrandDeletion],
  brandController.deleteBrand
);

router.get("/listBrands", brandController.listBrands);

router.get(
  "/listBrandsForAdmin",
  [auth, roleCheck(["admin"])],
  brandController.listBrands
);
module.exports = router;
