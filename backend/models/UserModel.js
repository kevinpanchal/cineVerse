// Author - Vaidik Anilbhai Nimavat (B00925420)

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  stripeCustomerId: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  phoneNo: {
    type: String,
    default: "",
  },
  unit: {
    type: String,
    default: "",
  },
  street: {
    type: String,
    default: "",
  },
  postalCode: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  province: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  imageUrl: {
    type: String,
    default: "",
  },
  otp: {
    type: String,
    default: "",
  },
  resetPasswordToken: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
