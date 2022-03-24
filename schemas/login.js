const mongoose = require("mongoose")

const loginSchema = new mongoose.Schema({
    role: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String},
    profile_img: {type: String, required: true},
    status: {type: String, required: true}
}, {
    collection: "Admins"
})

const model = mongoose.model("loginSchema", loginSchema);

module.exports = model


// name: { type: String, required: true },
    // email: { type: String, required: true, unique: true },
    // phone: { type: String },
    // password: { type: String, required: true }