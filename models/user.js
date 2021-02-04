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
    phone:{
      type:Number,
      required:true
    },
    password: {
      type: String,
      required: true
    },
    //define admin and simple user
    role: {
      type: Number,
      default: 0
    }
  },
  //for stroing the update and create time
  { timestamps: true }
);



module.exports = mongoose.model("User", userSchema);
