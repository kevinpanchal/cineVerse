const express = require("express");
const movieController = require("../../controllers/movieController");

const router = express.Router();

// Route for fetching all movies
router.get("/", movieController.getAllMovies);

// Route for adding a movie
router.post("/", movieController.addMovie);

// Route for updating a movie
router.put("/:id", movieController.updateMovie);

// Route for deleting a movie
router.delete("/:id", movieController.deleteMovie);

module.exports = router;
