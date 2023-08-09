const Movie = require("../../models/movieModel");
const response = require("../../utils/response");

// User Controllers
const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return response(res, 404, false, { error: "Movie not found" });
    }

    return response(res, 200, true, movie);
  } catch (err) {
    return response(res, 500, false, { error: err.message });
  }
};

const getMoviesByGenre = async (req, res) => {
  try {
    const genre = req.params.genre;
    const movies = await Movie.find({ genre });

    if (!movies || movies.length === 0) {
      return response(res, 404, false, {
        error: "No movies found for the given genre",
      });
    }

    return response(res, 200, true, movies);
  } catch (err) {
    return response(res, 500, false, { error: err.message });
  }
};

const addReview = async (req, res) => {
  try {
    const movieId = req.params.id;
    const review = req.body;
    const reviewBody = {
      reviewerName: review?.reviewerName || null,
      rating: review?.rating || null,
      review: review?.review || null,
    };

    if (
      reviewBody.reviewerName === null ||
      reviewBody.rating === null ||
      reviewBody.review === null
    ) {
      throw new Error("Review fields cannot be null");
    }

    const updatedMovie = await Movie.findOneAndUpdate(
      { _id: movieId },
      { $push: { topReviews: reviewBody } },
      { new: true }
    );

    if (!updatedMovie) {
      return response(res, 404, false, { error: "Movie not found" });
    }

    return response(res, 200, true, updatedMovie);
  } catch (err) {
    return response(res, 500, false, { error: err.message });
  }
};

// Admin Controller
const addMovie = async (req, res) => {
  try {
    const movieData = req.body;
    const newMovie = new Movie(movieData);
    const savedMovie = await newMovie.save();
    return response(res, 201, true, savedMovie);
  } catch (err) {
    return response(res, 500, false, { error: err.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    return response(res, 200, true, movies);
  } catch (err) {
    return response(res, 500, false, { error: err.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movieData = req.body;
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, movieData, {
      new: true,
    });

    if (!updatedMovie) {
      return response(res, 404, false, { error: "Movie not found" });
    }

    return response(res, 200, true, updatedMovie);
  } catch (err) {
    return response(res, 500, false, { error: err.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const deletedMovie = await Movie.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      return response(res, 404, false, { error: "Movie not found" });
    }

    return response(res, 200, true, deletedMovie);
  } catch (err) {
    return response(res, 500, false, { error: err.message });
  }
};

module.exports = {
  getMovie,
  getMoviesByGenre,
  addReview,
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
};
