const express = require("express");
const movieController = require("../../controllers/theatreController");

const router = express.Router();

// Route for fetching all theatre
router.get("/", movieController.getAllTheatre);

// Route for adding a theatre
router.post("/", movieController.addTheatre);

// Route for adding a movie to theatre
router.post("/:id/addMovie", movieController.addMovieDetail);

// Route for updating a theatre
router.put("/:id", movieController.updateTheatre);

// Route for deleting a theatre
router.delete("/:id", movieController.deleteTheatre);

// Route for deleting a movie from a theatre
router.delete("/:id/:movieId", movieController.deleteMovieDetail);

module.exports = router;
