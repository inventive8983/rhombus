const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    username: String,
    email: String,
    password: String,
})

module.exports = mongoose.model("Admin", adminSchema);