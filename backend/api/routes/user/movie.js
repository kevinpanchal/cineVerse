const express = require("express");
const movieController = require("../../controllers/movieController");

const router = express.Router();

// Route for fetching a movie by ID
router.get("/:id", movieController.getMovie);

// Route for fetching movies by genre
router.get("/genre/:genre", movieController.getMoviesByGenre);

// Route for adding a review to a movie
router.post("/:id/reviews", movieController.addReview);

module.exports = router;
