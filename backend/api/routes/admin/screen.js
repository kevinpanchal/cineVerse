const express = require("express");
const screenController = require("../../controllers/screenController");

const router = express.Router();

// Route for fetching all screens
router.get("/", screenController.getAllScreens);

// Route for adding a screen
router.post("/", screenController.addScreen);

// Route for updating a screen
router.put("/:id", screenController.updateScreen);

// Route for deleting a screen
router.delete("/:id", screenController.deleteScreen);

module.exports = router;
