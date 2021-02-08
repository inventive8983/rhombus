const mongoose = require("mongoose");

const general = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    data: Array
})

module.exports = mongoose.model("General", general);