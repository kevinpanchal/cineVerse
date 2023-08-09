const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const Inquiry = require("../../models/Inquiry");
const sendEmail = require("../../utils/nodemail");
const response = require("../../utils/response");

app.use(cors());
app.use(bodyParser.json());

// function getEmailFromToken(token) {
//   return "test@example.com";
// }

const inquireNow = async (req, res) => {
  try {
    const formData = req.body;
    // const token = req.headers.authorization;

    // const email = getEmailFromToken(token);

    formData.email = email;

    const inquiry = new Inquiry(formData);
    const data = await inquiry.save();

    await sendEmail(
      email,
      "Inquiry Confirmation",
      `<p>Thank you for your inquiry!</p><p>We have received your inquiry and will get back to you shortly.</p>`
    );

    console.log(data);
    res.status(201).json({ message: "Inquiry submitted successfully!" });
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = { inquireNow };
