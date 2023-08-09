const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  showTimes: {
    type: [String],
    required: true,
  },
});

// Define the Theatre schema
const theatreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  movieDetails: {
    type: [movieSchema],
    default: [],
    required: false,
  },
});

// Create the Theatre model
module.exports = mongoose.model("Theatre", theatreSchema);
