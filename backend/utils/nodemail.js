const nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "cineverseappplication@gmail.com",
    pass: "ikrjolabjnphyync",
  },
});

const sendEmail = async (email, subject, body) => {
  const mailOptions = {
    from: "browniepointapp@gmail.com",
    to: email,
    subject: subject,
    html: body,
  };

  return await smtpTransport.sendMail(mailOptions);
};

module.exports = sendEmail;
