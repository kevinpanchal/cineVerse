const express = require("express");
const screenController = require("../../controllers/screenController");

const router = express.Router();

// Route for adding a booking
router.post("/:movie/:theatre/booking", screenController.addBooking);

// Route for fetching all booked seats
router.get("/:movie/:theatre", screenController.getBookedSeats);

// Route for booking seats
router.post("/:movie/:theatre", screenController.bookSeats);

module.exports = router;
