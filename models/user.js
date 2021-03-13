
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    mobile:{
      type:Number,
      required:true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
    },
    //define admin and simple user
    role: {
      type: Number,
      default: 0
    },
    addresses: [
      {
        street: String,
        city: String,
        state: String,
        country: String,
        pincode: String
      }
    ],
    defaultPaymentMethod: String,
    paymentMethods: Array,
    myOrders: Array

  },
  //for storing the update and create time
  { timestamps: true }
);



module.exports = mongoose.model("User", userSchema);
