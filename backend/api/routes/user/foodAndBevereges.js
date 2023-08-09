// Author - Roshil Ka Patel (B00917345)
const router = require("express").Router();
const {
  getFoodItems,
} = require("../../controllers/foodAndBeveregesController");

router.get("/getAll", getFoodItems);

module.exports = router;
