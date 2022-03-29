const mongoose = require("mongoose")

const userLogSchema = new mongoose.Schema({
    user: {type: String, required: true},
    inTime: {type: String, required: true},
    outTime: {type: String, required: true},
}, {
    collection: "UserLog", timestamps: true
})

const model = mongoose.model("userLogSchema", userLogSchema);

module.exports = model