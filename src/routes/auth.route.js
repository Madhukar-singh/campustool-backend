const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

const validator = require("express-validation");
const { login, create, update } = require("../validations/user.validation");

router.post("/login", validator(login), authController.login);
router.post(
  "/signup",
  validator(create),
  validator(update),
  authController.signup
);

module.exports = router;
