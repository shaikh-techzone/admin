const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    title: {type: String, required: true},
    location: {type: String, required: true},
    job_nature: {type: String, required: true},
    salary_range: {type: String, required: true},
    job_desc: {type: String, required: true},
    responsibility: {type: String, required: true},
    qualification: {type: String, required: true},
    vacancy: {type: String, required: true},
    category: {type: String, required: true},
    company_detail: {type: String, required: true},
}, {
    collection: "Jobs", timestamps: true
})

const model = mongoose.model("jobSchema", jobSchema);

module.exports = model