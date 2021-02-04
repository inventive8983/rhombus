const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
    
    _id: mongoose.Types.ObjectId,
    code:String,
    discount: {
        type: Number,
        max: 100,
    },
    limit: Number

})

module.exports = mongoose.model("Promocode", codeSchema);