// Author - Vaidik Anilbhai Nimavat (B00925420)

const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const response = require("../utils/response");

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return response(res, 401, false, {
        message: "Fail to authenticate token.",
      });
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return response(res, 403, false, {
          message: "Failed to authenticate token",
        });
      }
      req.user = await UserModel.findById(decoded.id);
      next();
    });
  } catch (error) {
    return response(res, 401, false, { message: "No token provided" });
  }
};

const authenticateAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return response(res, 401, false, {
        message: "Fail to authenticate token.",
      });
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return response(res, 403, false, {
          message: "Failed to authenticate token",
        });
      }
      const user = await UserModel.findById(decoded.id);
      if (user.role !== "admin") {
        return response(res, 403, false, {
          message: "Invalid Authorization",
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return response(res, 401, false, { message: "No token provided" });
  }
};

module.exports = {
  authenticateUser,
  authenticateAdmin,
};
