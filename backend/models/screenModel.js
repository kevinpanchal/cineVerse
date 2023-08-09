const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  showTime: {
    type: String,
    required: true,
  },
  bookedSeats: {
    type: [String],
    required: false,
    default: [],
  },
});

const screenSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  theatre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theatre",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bookingDetails: {
    type: [bookingSchema],
    required: false,
    default: [],
  },
  
});

module.exports = mongoose.model("Screen", screenSchema, "screens");