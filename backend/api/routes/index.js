const router = require("express").Router();
const AdminFoodAndBeverages = require("./admin/foodAndBeverages");
const FoodAndBeverages = require("./user/foodAndBevereges");
const Payments = require("./user/payments");
const movieRoutes = require("./user/movie");
const adminMovieRoutes = require("./admin/movie");
const userManager = require("./user/userManager");
const screenRoutes = require("./user/screen");
const adminScreenRoutes = require("./admin/screen");
const contact = require("./user/contact");
const landing = require("./user/landing");
const theatre = require("./user/theatre");
const adminTheatreRoutes = require("./admin/theatre");
const inquireRoutes = require("./user/inquire");

// Admin routes
router.use("/admin/foodAndBeverages", AdminFoodAndBeverages);
router.use("/admin/movie", adminMovieRoutes);
router.use("/admin/screen", adminScreenRoutes);
router.use("/admin/theatre", adminTheatreRoutes);

// User routes
router.use("/foodAndBeverages", FoodAndBeverages);
router.use("/movie", movieRoutes);
router.use("/payments", Payments);
router.use("/user", userManager);
router.use("/screen", screenRoutes);
router.use("/contact", contact);
router.use("/landing", landing);
router.use("/theatre", theatre);
router.use("/inquiry", inquireRoutes);

module.exports = router;
