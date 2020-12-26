const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const User = require("../models/user.model");
const Applicant = require("../models/applicant.model");
const Recruiter = require("../models/recruiter.model");
const Company = require("../models/company.model");

exports.signup = async (req, res) => {
  try {
    const userData = req.body;
    const existing = await User.findOne({
      role: req.body.role,
      email: req.body.email,
    }).exec();
    if (!existing) {
      const user = new User(userData);
      const savedUser = await user.save();
      userData.id = savedUser.id;
      let userDetails;
      switch (savedUser.role) {
        case "applicant":
          userDetails = new Applicant(userData);
          break;
        case "recruiter":
          userDetails = new Recruiter(userData);
          break;
        default:
          userDetails = new Company(userData);
      }
      const savedUserDetails = await userDetails.save();
      const response = {
        account: savedUser.transform(),
        details: savedUserDetails.transform(),
      };
      res.status(httpStatus.CREATED);
      res.send(response);
    } else {
      res
        .status(httpStatus.CONFLICT)
        .send({ message: "Email already exist" });
    }
  } catch (error) {
    res.status(httpStatus.CONFLICT).send(User.checkDuplicateEmailError(error));
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findAndGenerateToken(req.body);
    const payload = { email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.secretKey);
    return res.json({ message: "OK", token: token, user: user });
  } catch (error) {
    res.send(error);
  }
};
