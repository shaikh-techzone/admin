const mongoose = require("mongoose");

const ScholarshipSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    type: { type: String, required: true },
    about_scholarship: { type: String, required: true },
    eligibility: { type: String, required: true },
    seats: { type: String, required: true },
    minimum_percent: { type: String, required: true },
    scholarship: { type: String, required: true },
    deadline: { type: String, required: true },
  },
  {
    collection: "Scholarships",
    timestamps: true,
  }
);

const model = mongoose.model("ScholarshipSchema", ScholarshipSchema);

module.exports = model;
