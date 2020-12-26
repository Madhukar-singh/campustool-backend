const express = require("express");
const auth = require("./auth.route");
const user = require("./user.route");
const jobs = require("./jobs.route");
const events = require("./events.route");
const document = require("./document.route");
const post = require("./post.route");
const searchRouter = require("./search.route");
const messageRouter = require("./message.route");
const companyRouter = require("./company.route");
const healthCheck = require("../controllers");

const router = express.Router();

router.get("/", healthCheck);
router.use("/auth", auth);
router.use("/user", user);
router.use("/jobs", jobs);
router.use("/post", post);
router.use("/events", events);
router.use("/document", document);
router.use("/message", messageRouter);
router.use("/search", searchRouter);
router.use("/company", companyRouter);

module.exports = router;
