const ContactModel = require("../../models/ContactModel");
const sendEmail = require("../../utils/nodemail");
const response = require("../../utils/response");

const saveContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {
      return response(res, 400, false, {
        message: "First Name, Last Name, Email, Phone, Message are required.",
      });
    }

    const contact = new ContactModel({
      firstName,
      lastName,
      email,
      phone,
      message,
    });
    await contact.save();

    await sendEmail(
      email,
      "Thank you for Contacting Us",
      `<b>Dear ${firstName},</b> <br/> <p>We hope this email finds you well. On behalf of CineVerse, I would like to express our sincere gratitude for reaching out to us. We appreciate the opportunity to assist you with your inquiry/request, and we are committed to providing you with the best possible service.</p>`
    );

    await sendEmail(
      "vaidiknimavat8922@gmail.com",
      "Contact us request created",
      `Name: ${firstName} ${lastName} <br/> Phone: ${phone} <br/> Email: ${email} <br/> Message: ${message}`
    );

    return response(res, 200, true, {
      message: "Request received, our team will contact you back soon.",
    });
  } catch (error) {
    return response(res, 500, false, { message: "Something went wrong." });
  }
};

module.exports = {
  saveContact,
};
