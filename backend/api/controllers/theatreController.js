const Theatre = require("../../models/TheatreModel");
const response = require("../../utils/response");

const getTheatre = async (req, res) => {
  try {
    const movieId = req.params.id;
    const theatre = await Theatre.find({
      "movieDetails.movie": movieId,
    }).populate(["movieDetails.movie"]);

    if (!theatre) {
      return response(res, 404, false, { error: "Theatre not found" });
    }

    return response(res, 200, true, theatre);
  } catch (err) {
    return response(res, 500, false, { error: err.message });
  }
};

// Admin Controller
const addTheatre = async (req, res) => {
  try {
    const theatreData = req.body;
    const theatre = new Theatre(theatreData);
    const savedtheatre = await theatre.save();
    return response(res, 201, true, savedtheatre);
  } catch (err) {
    return response(res, 500, false, { error: err.message });
  }
};

const addMovieDetail = async (req, res) => {
  try {
    const theatreId = req.params.id;
    const { movieDetail } = req.body;

    if (movieDetail?.movie === null || movieDetail?.showTimes === null) {
      throw new Error("Movie details fields cannot be null");
    }

    const updatedTheatre = await Theatre.findOneAndUpdate(
      { _id: theatreId },
      { $push: { movieDetails: movieDetail } },
      { new: true }
    );

    if (!updatedTheatre) {
      return response(res, 404, false, { error: "Theatre not found" });
    }

    return response(res, 200, true, updatedTheatre);
  } catch (err) {
    return response(res, 500, false, { error: err.message });
  }
};

const deleteMovieDetail = async (req, res) => {
  try {
    const theatreId = req.params.id;
    const movieId = req.params.movieId;

    const theatre = await Theatre.findById(theatreId);

    if (!theatre) {
      return response(res, 404, false, { error: "Theatre not found" });
    }

    const updatedMovieDetails = theatre.movieDetails.filter(
      (movieDetail) => movieDetail.movie.toString() !== movieId
    );

    const updatedTheatre = await Theatre.findByIdAndUpdate(
      theatreId,
      { movieDetails: updatedMovieDetails },
      { new: true }
    );

    return response(res, 200, true, updatedTheatre);
  } catch (err) {
    return response(res, 500, false, { error: err.message });
  }
};

const getAllTheatre = async (req, res) => {
  try {
    const theatres = await Theatre.find().populate(["movieDetails.movie"]);
    return response(res, 200, true, theatres);
  } catch (err) {
    return response(res, 500, false, { error: err.message });
  }
};

const updateTheatre = async (req, res) => {
  try {
    const theatreId = req.params.id;
    const theatreData = req.body;
    const theatre = await Theatre.findByIdAndUpdate(theatreId, theatreData, {
      new: true,
    });

    if (!theatre) {
      return response(res, 404, false, { error: "Theatre not found" });
    }

    return response(res, 200, true, theatre);
  } catch (err) {
    return response(res, 500, false, { error: err.message });
  }
};

const deleteTheatre = async (req, res) => {
  try {
    const theatreId = req.params.id;
    const theatre = await Theatre.findByIdAndDelete(theatreId);

    if (!theatre) {
      return response(res, 404, false, { error: "Theatre not found" });
    }

    return response(res, 200, true, theatre);
  } catch (err) {
    return response(res, 500, false, { error: err.message });
  }
};

module.exports = {
  getTheatre,
  addTheatre,
  addMovieDetail,
  deleteMovieDetail,
  getAllTheatre,
  updateTheatre,
  deleteTheatre,
};
