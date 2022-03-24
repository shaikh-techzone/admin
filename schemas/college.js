const mongoose = require("mongoose")

const CollegeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    street_address: {type: String, required: true},
    about_college: {type: String, required: true},
    eligibility: {type: String, required: true},
    seats: {type: String, required: true},
    minimum_percent: {type: String, required: true},
    rank: {type: String, required: true},
    scholarship: {type: String, required: true}
}, {
    collection: "Colleges", timestamps: true
})

const model = mongoose.model("CollegeSchema", CollegeSchema);

module.exports = model