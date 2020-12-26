function healthCheck(req, res) {
  res.status(200).send("App is running");
}

module.exports = healthCheck;
