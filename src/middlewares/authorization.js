const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const APIError = require("../utils/APIError");
const httpStatus = require("http-status");

const authorize = () => async (req, res, next) => {
  let tokenData, error;
  try {
    tokenData = jwt.verify(req.headers["x-auth-token"], process.env.secretKey);
    const userData = await User.findOne({ email: tokenData.email });
    if ("email" in userData) {
      req.user = userData;
      next();
    } else {
      error = new APIError("Unauthorized", httpStatus.UNAUTHORIZED);
      res.send(error);
    }
  } catch (err) {
    error = new APIError(err.message, httpStatus.UNAUTHORIZED);
    res.send(error);
  }
};

module.exports = authorize;
