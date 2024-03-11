const express = require("express");
const router = express.Router();
const {userValidator} = require("../validators")
const {userController} = require("../controllers")
const {
  auth,
  
} = require("../middlewares");
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
router.post(
    "/delete",
    auth,
    userController.deleteUser
  );
module.exports = router;