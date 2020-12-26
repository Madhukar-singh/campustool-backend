const express = require("express");
const auth = require("../middlewares/authorization");
const router = new express.Router();
const usersController = require("../controllers/user.controller");
const validator = require("express-validation");
const { update } = require("../validations/user.validation");
const { userId } = require("../validations/common.validation");

router.get("/:userId", auth(), validator(userId), usersController.getOne);
router.put(
  "/:userId",
  auth(),
  validator(userId),
  validator(update),
  usersController.putOne
);

module.exports = router;
