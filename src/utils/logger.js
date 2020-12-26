const winston = require("winston");
require("winston-daily-rotate-file");
const transport = new winston.transports.DailyRotateFile({
  filename: "./logs/node-web.log",
  datePattern: "yyyy-MM-dd.",
  prepend: true,
  level: "info",
});

const logger = winston.createLogger({
  transports: transport,
  exitOnError: false,
});
module.exports = logger;
