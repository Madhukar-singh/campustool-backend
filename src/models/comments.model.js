const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema();

commentsSchema.add({
  id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },
  name: {
    type: String,
    ref: "User",
  },
  message: String,
  date: Date,
  parentCommentIdRef: {
    type: Schema.Types.ObjectId,
    ref: "Comments",
  },
  comments: [commentsSchema],
});

module.exports = mongoose.model("Comments", commentsSchema);
