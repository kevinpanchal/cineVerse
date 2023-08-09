// Author - Vaidik Anilbhai Nimavat (B00925420)

const express = require("express");
const userController = require("../../controllers/userController");
const { authenticateUser } = require("../../../middleware/authmiddleware");
const multer = require("../../../utils/multer");

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post(
  "/:id/updateuserinfo",
  [multer.single("file"), authenticateUser],
  userController.updateUserInfo
);
router.get("/:email/getuserinfo", authenticateUser, userController.getUserInfo);
router.post("/forgotpassword", userController.forgotPassword);
router.post("/resetpassword", userController.resetPassword);

module.exports = router;
