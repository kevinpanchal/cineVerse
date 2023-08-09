const express = require("express");
const landingController = require("../../controllers/landingController");

const router = express.Router();

// Route for fetching current movies and rotating banner movies
router.get("/current", landingController.getCurrentMovies);

// Route for fetching upcoming movies
router.get("/upcoming", landingController.getUpcomingMovies);

module.exports = router;
