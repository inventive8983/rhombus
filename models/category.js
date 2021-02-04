const mongoose = require("mongoose");

const category = new mongoose.Schema({
    
    _id: mongoose.Types.ObjectId,
    name:String,
    description: String

})

module.exports = mongoose.model("Category", category);