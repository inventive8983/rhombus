const mongoose = require("mongoose");

const media = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    avatar: String,
    name:{
        type: String,
        required: true
    },
    designation: String,
    rating: Number,
    reviews: {
        type: String,
        required: true
    },
    email: String,
})

module.exports = mongoose.model("Media", media);