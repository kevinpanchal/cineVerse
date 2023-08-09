// Author - Roshil Ka Patel (B00917345)
const router = require("express").Router();
const multer = require("../../../utils/multer");
const {
  getFoodItem,
  addFoodItem,
  deleteItem,
  changeItemStatus,
  updateFoodItem,
  getAllFoddItems,
} = require("../../controllers/foodAndBeveregesController");

router.get("/getItems", getAllFoddItems);
router.get("/get/:id", getFoodItem);
router.post("/addItem", multer.single("file"), addFoodItem);
router.put("/updateItem", multer.single("file"), updateFoodItem);
router.put("/chageItemStatus", changeItemStatus);
router.delete("/deleteItem/:id", deleteItem);

module.exports = router;
