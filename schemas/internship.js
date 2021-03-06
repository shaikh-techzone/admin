const mongoose = require("mongoose");

const InternshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    internship_nature: { type: String, required: true },
    salary_range: { type: String, required: true },
    internship_desc: { type: String, required: true },
    responsibility: { type: String, required: true },
    qualification: { type: String, required: true },
    vacancy: { type: String, required: true },
    category: { type: String, required: true },
    company_detail: { type: String, required: true },
    deadline: { type: String, required: true },
  },
  {
    collection: "Internships",
    timestamps: true,
  }
);

const model = mongoose.model("InternshipSchema", InternshipSchema);

module.exports = model;
