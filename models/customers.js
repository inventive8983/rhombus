const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    
    _id: mongoose.Types.ObjectId,
    name: String,
    mobile: Number,
    city: String,
    date: {
        type: Date,
        default: Date.now()
    },
    course: String    

})

module.exports = mongoose.model("Customers", customerSchema);