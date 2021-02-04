const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    
    _id: mongoose.Types.ObjectId,

    orderId: String,
    transactionId: String,
    name: String,
    phone: String,
    email: String,
    date: Date,
    billingAddress: String,
    city: String,
    state: String,
    pincode: String,
    totalAmount: Number,
    currency:{
        type: String,
        default: "INR"
    },
    
    items: [{
        product: String,
        id: String,
        name: String,
        details: Array,
        amount: Number,
        quantity: Number,
    }],

    status: {
        type: String,
        default: "TXN_PENDING"
    },
    meta: Object
})

module.exports = mongoose.model("Order", orderSchema);