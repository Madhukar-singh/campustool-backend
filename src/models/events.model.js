const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const type = ["jobfair", "corporate", "confrence"];

const eventsSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    ref: "Recruiter",
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
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
  image: {
    type: String,
    default: "/default-event.jpg",
  },
  type: {
    type: String,
    default: "jobfair",
    enum: type,
  },
  price: {
    type: Number,
  },
});

eventsSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "id",
      "name",
      "location",
      "dateTime",
      "description",
      "image",
    ];
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  },
});

module.exports = mongoose.model("Events", eventsSchema);
