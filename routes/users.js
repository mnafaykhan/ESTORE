const express = require("express");
const router = express.Router();
const {userValidator} = require("../validators")
const {userController} = require("../controllers")
router.post(
    "/register",
    [userValidator.validateCreateUser],
    userController.createUser
  );
  router.post(
    "/login",
    [userValidator.validateUserLogin],
    userController.loginUser
  );
module.exports = router;