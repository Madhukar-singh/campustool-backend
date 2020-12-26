const Events = require("../models/events.model");
const httpStatus = require("http-status");
const APIError = require("../utils/APIError");

exports.get = async (req, res) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const pageSize = parseInt(req.query["page-size"]) || 10;
  try {
    const data = await Events.find()
      .sort({ dateTime: -1 })
      .skip(page * pageSize)
      .limit(pageSize)
      .exec();
    if (data) {
      res.send(data);
    } else {
      throw new APIError(`Events not found`, httpStatus.NO_CONTENT);
    }
  } catch (err) {
    next(err);
  }
};

exports.post = async (req, res, next) => {
  const formData = req.body;
  formData.id = req.user.id;
  try {
    const event = new Events(formData);
    const savedEvent = await event.save(formData);
    if (savedEvent) {
      res.status(httpStatus.OK);
      res.send({ message: "Succussfully created with id " + savedEvent._id });
    } else {
      throw new APIError(`Event not created`, httpStatus.BAD_REQUEST);
    }
  } catch (err) {
    next(err);
  }
};
