const { saveContact } = require("../../controllers/contact");

const router = require("express").Router();

router.post("/save", saveContact);

module.exports = router;
