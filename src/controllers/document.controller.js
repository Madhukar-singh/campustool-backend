const httpStatus = require("http-status");
const APIError = require("../utils/APIError");

exports.upload = async (req, res, next) => {
  try {
    if (!req.files) {
      throw new APIError("File is not recived");
    }
    const response = { payLoad: [] };
    for (let index = 0; index < req.files.length; index++) {
      const element = req.files[index];
      const url = element.location;
      response.payLoad.push({url, key: element.key});
    }
    res.status(httpStatus.CREATED);
    res.send(response);
  } catch (error) {
    next(error);
  }
};
