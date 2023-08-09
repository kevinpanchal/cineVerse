const express = require("express");
const theatreController = require("../../controllers/theatreController");

const router = express.Router();

router.get("/:id", theatreController.getTheatre);

module.exports = router;
