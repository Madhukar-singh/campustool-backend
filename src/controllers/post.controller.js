const Post = require("../models/post.model");
const httpStatus = require("http-status");
const APIError = require("../utils/APIError");

exports.get = async (req, res) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const pageSize = parseInt(req.query["page-size"]) || 10;
  try {
    const data = await Post.find()
      .sort({ dateTime: -1 })
      .skip(page * pageSize)
      .limit(pageSize)
      .exec();
    if (data) {
      res.send(data);
    } else {
      throw new APIError(`Post not found`, httpStatus.NO_CONTENT);
    }
  } catch (err) {
    next(err);
  }
};

exports.post = async (req, res, next) => {
  const formData = req.body;
  formData.id = req.user.id;
  try {
    const event = new Post(formData);
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

exports.addComment = async (req, res, next) => {
  const formData = req.body;
  formData.id = req.user.id;
  const post = await Post.findById(req.params.id);
  post.comments.push(formData);
  const saved = await post.save();
  if (saved._id) {
    res
      .status(httpStatus.CREATED)
      .send({ message: "Succussfully saved with id " + saved._id });
  } else {
    throw new APIError(`Comment not saved`, httpStatus.BAD_REQUEST);
  }
};
