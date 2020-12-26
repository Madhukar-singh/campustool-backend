const express = require("express");
const auth = require("../middlewares/authorization");
const router = new express.Router();
const eventsController = require("../controllers/events.controller");

router.get("/", auth(), eventsController.get);
router.post("/", auth(), eventsController.post);

module.exports = router;
