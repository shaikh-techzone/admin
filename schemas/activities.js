const mongoose = require("mongoose")

const ActivitySchema = new mongoose.Schema({
    user: {type: String, required: true},
    task: {type: String, required: true},
}, {
    collection: "Activities", timestamps: true
})

const model = mongoose.model("ActivitySchema", ActivitySchema);

module.exports = model