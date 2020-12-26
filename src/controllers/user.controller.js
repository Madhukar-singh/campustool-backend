const User = require("../models/user.model");
const Applicant = require("../models/applicant.model");
const Recruiter = require("../models/recruiter.model");
const Company = require("../models/company.model");
const APIError = require("../utils/APIError");
const httpStatus = require("http-status");
const mongoose = require("mongoose");

exports.getOne = async (req, res, next) => {
  let Model;
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId))
      throw new APIError(`Invalid userId`, httpStatus.BAD_REQUEST);
    const response = { payLoad: {} };
    const userAccount = await User.findById(req.params.userId).exec();
    if (userAccount && userAccount.role) {
      switch (userAccount.role) {
        case "company":
          Model = Company;
          response.payLoad.role = "company";
          break;
        case "institute":
          Model = Company;
          response.payLoad.role = "institute";
          break;
        case "applicant":
          Model = Applicant;
          response.payLoad.role = "applicant";
          break;
        default:
          Model = Recruiter;
          response.payLoad.role = "recruiter";
          break;
      }
    }
    const user = await Model.findOne({ id: req.params.userId }).exec();
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
    const user = role === "applicant" ? Applicant : Recruiter;
    let userDetails = await user.findOne({ id: userId }).exec();
    for (const key in req.body) {
      if (
        user.schema.obj.hasOwnProperty(key) &&
        key !== "id" &&
        key !== "_id"
      ) {
        userDetails[key] = req.body[key];
      }
    }
    const updatedUserDetails = await userDetails.save();
    if (updatedUserDetails) {
      response.message = "SUCCESS";
      response.payLoad = updatedUserDetails;
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
