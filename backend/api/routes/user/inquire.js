const { authenticateUser } = require("../../../middleware/authmiddleware");
const { inquireNow } = require("../../controllers/inqury");

const router = require("express").Router();

router.use(authenticateUser);

router.post("/test", inquireNow);

module.exports = router;
