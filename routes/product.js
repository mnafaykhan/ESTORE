const express = require("express");
const router = express.Router();
const {productController} = require("../controllers");

const { roleCheck, auth, uploadImages, uploadImage } = require("../middlewares");
const { productValidator } = require("../validators");

router.post(
  "/addProduct",
  [uploadImages],
  [auth, roleCheck(["Admin"]), productValidator.validateProduct],
  productController.createProduct
);