const express = require("express");
const routes = require("../routes");
const cors = require("cors");
const errorHandler = require("../middlewares/error-handler");
require("dotenv").config();
const logger = require("../utils/logger");

const app = express();
app.use(express.json());

app.use(cors());

app.use("/api", routes);
app.use(errorHandler.handleNotFound);
app.use(errorHandler.handleError);

process.on("unhandledRejection", function (err) {
  logger.error("UnhandledRejection error" + err);
});
process.on("uncaughtException", function (error) {
  logger.error("uncaughtException" + error);
  logger.error("Error Stack", error.stack);
});

exports.start = () => {
  app.listen(process.env.PORT || 4000, (err) => {
    err && console.error(err);
    console.info(
      `Worker added with id ${process.pid} at port ${process.env.PORT || 4000}`
    );
  });
};

express.app = app;
