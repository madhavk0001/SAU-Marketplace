const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    required: true,
    unique: true
  },

  mobile: {
    type: String,
    required: true,
    unique: true
  },

  password: String,

  otp: String,
  otpExpiry: Date
});

// ✅ IMPORTANT EXPORT
module.exports = mongoose.model("User", userSchema);
