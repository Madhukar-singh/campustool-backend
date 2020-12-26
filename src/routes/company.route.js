const express = require("express");
const auth = require("../middlewares/authorization");
const router = new express.Router();
const companyController = require("../controllers/company.controller");

router.get("/:userId", auth(), companyController.getOne);
router.put("/:userId", auth(), companyController.putOne);

module.exports = router;
