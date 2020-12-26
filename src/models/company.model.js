const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    role_in_hiring: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    cin: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
    },
    website: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    company_size: {
      type: String,
      required: true,
    },
    headquarter: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    founded: {
      type: String,
      required: true,
    },
    specialities: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    details: {
      type: String,
    },
    logo: {
      type: String,
      default: "default-company-logo.jpg",
    },
  },
  {
    timestamps: true,
  }
);

companySchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "id",
      "company_name",
      "category",
      "role_in_hiring",
      "location",
      "cin",
      "phone_number",
      "website",
      "industry",
      "company_size",
      "headquarter",
      "type",
      "founded",
      "specialities",
      "address",
      "details",
      "logo",
    ];
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  },
  identityTransform() {
    const transformed = {};
    const fields = ["id", "name", "logo"];
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  },
});

module.exports = mongoose.model("Company", companySchema);
