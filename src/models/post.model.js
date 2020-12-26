const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const comments = require("./comments.model");

const type = ["post", "article", "blog"];

const eventsSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "/default-event.jpg",
  },
  author: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "post",
    enum: type,
  },
  comments: [comments.schema],
});

eventsSchema.method({
  transform() {
    const transformed = {};
    const fields = ["id", "author", "title", "dateTime", "description", "type"];
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  },
});

module.exports = mongoose.model("Post", eventsSchema);
