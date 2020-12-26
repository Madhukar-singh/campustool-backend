const User = require("../models/user.model");
const Company = require("../models/company.model");
const APIError = require("../utils/APIError");
const httpStatus = require("http-status");
const mongoose = require("mongoose");

exports.getOne = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId))
      throw new APIError(`Invalid id provided`, httpStatus.BAD_REQUEST);
    const response = { payLoad: {} };
    let user = await Company.findOne({ id: req.params.userId }).exec();
    response.payLoad.role = "company";
    response.payLoad.user = user;
    res.status(httpStatus.OK);
    res.send(response);
  } catch (error) {
    next(error);
  }
};

exports.putOne = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId))
      throw new APIError(`Invalid userId`, httpStatus.BAD_REQUEST);
    const userId = req.params.userId;
    const response = { payLoad: {}, message: "" };
    const userAccount = await User.findById(userId).exec();
    if (!userAccount)
      throw new APIError(
        `No user associated with id: ${userId}`,
        httpStatus.NOT_FOUND
      );
    const role = userAccount.role;
    let companyDetails = await Company.findOne({ id: userId }).exec();
    for (const key in req.body) {
      if (
        user.schema.obj.hasOwnProperty(key) &&
        key !== "id" &&
        key !== "_id"
      ) {
        companyDetails[key] = req.body[key];
      }
    }
    const updatedCompanyDetails = await companyDetails.save();
    if (updatedCompanyDetails) {
      response.message = "SUCCESS";
      response.payLoad = updatedCompanyDetails;
      res.status(httpStatus.OK);
      res.send(response);
    } else {
      throw new APIError(
        `User with id: ${userId} not updated`,
        httpStatus.NOT_FOUND
      );
    }
  } catch (error) {
    next(error);
  }
};
