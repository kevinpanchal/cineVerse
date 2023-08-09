// Author - Vaidik Anilbhai Nimavat (B00925420)

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/UserModel");
const response = require("../../utils/response");
const uploadImage = require("../../utils/cloudinary");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const sendEmail = require("../../utils/nodemail");

const generateOTP = () => {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return response(res, 404, false, { message: "User not found" });
    }

    const otp = generateOTP();
    user.otp = otp;

    const mailSubject = "OTP for Password Reset";
    const mailBody = `Your OTP for password reset is: ${otp}`;

    await sendEmail(email, mailSubject, mailBody);

    user.save();
    return response(res, 200, true, { message: "OTP sent via email" });
  } catch (error) {
    console.error("Error during forgot password", error);
    return response(res, 500, false, { message: "Forgot password failed" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { otp, email, password, confirmPassword } = req.body;
    // const email = req.params.email;

    const user = await User.findOne({ email });
    if (!user) {
      return response(res, 404, false, { message: "User not found" });
    }

    if (user.otp !== otp) {
      return response(res, 400, false, { message: "Invalid OTP" });
    }

    if (password !== confirmPassword) {
      return response(res, 409, false, { message: "Password doesn't match" });
    }

    const hashedPassword = await bcrypt.hash(confirmPassword, 10);

    user.password = hashedPassword;
    user.otp = null;
    await user.save();
    const mailSubject = "Password Reset Successful";
    const mailBody = "Your password has been successfully reset.";

    await sendEmail(email, mailSubject, mailBody);

    return response(res, 200, true, { message: "Password reset successful" });
  } catch (error) {
    console.error("Error during password reset", error);
    return response(res, 500, false, { message: "Password reset failed" });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response(res, 409, false, { message: "User already exists" });
    }

    if (password !== confirmPassword) {
      return response(res, 409, false, { message: "Password dosen't match." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = await stripe.customers.create({
      email,
    });
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      repassword: hashedPassword,
      stripeCustomerId: customer.id,
      role: "user",
    });
    await newUser.save();
    return response(res, 201, true, { message: "User created successfully" });
  } catch (error) {
    console.error("Error during registration", error);
    return response(res, 500, false, { message: "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return response(res, 401, true, { message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return response(res, 401, true, { message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });
    return response(res, 200, true, {
      token,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    return response(res, 500, false, { message: "Login failed" });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = req.body;

    if (req.user._id != id) {
      return response(res, 403, false, { message: "unauthorized user" });
    }

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const imageData = await uploadImage(dataURI);
      userData.imageUrl = imageData.url;
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          name: userData.name,
          phoneNo: userData.phoneNo,
          unit: userData.unit,
          street: userData.street,
          postalCode: userData.postalCode,
          country: userData.country,
          city: userData.city,
          province: userData.province,
          imageUrl: userData.imageUrl,
        },
      },
      { new: true }
    );

    const updatedUser = {
      user: {
        name: user.name,
        phoneNo: user.phoneNo,
        unit: user.unit,
        street: user.street,
        postalCode: user.postalCode,
        country: user.country,
        city: user.city,
        province: user.province,
        imageUrl: user.imageUrl,
        _id: user._id,
      },
    };

    return response(res, 200, true, updatedUser);
  } catch (error) {
    console.error("Error while updating user info", error);
    return response(res, 500, false, { message: "Failed to update user info" });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const userId = req.params.email;
    const user = await User.findOne({ email: userId });

    const userInfo = {
      user: {
        name: user.name,
        phoneNo: user.phoneNo,
        email: user.email,
        unit: user.unit,
        street: user.street,
        postalCode: user.postalCode,
        country: user.country,
        city: user.city,
        province: user.province,
        imageUrl: user.imageUrl,
        _id: user._id,
      },
    };

    return response(res, 200, true, userInfo);
  } catch (error) {
    console.error("Error while fetching user info", error);
    return response(res, 500, false, { message: "Failed to fetch user info" });
  }
};

module.exports = {
  register,
  login,
  updateUserInfo,
  getUserInfo,
  forgotPassword,
  resetPassword,
};
