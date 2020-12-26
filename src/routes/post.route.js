const express = require("express");
const auth = require("../middlewares/authorization");
const router = new express.Router();
const postController = require("../controllers/post.controller");

router.get("/", auth(), postController.get);
router.post("/", auth(), postController.post);
router.post("/comment/:id", auth(), postController.addComment);

module.exports = router;