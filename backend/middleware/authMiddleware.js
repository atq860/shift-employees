import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { userType } from "../constants/userType.js";

// this is middleware, so passing next
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //fetching User
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized, Token Failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, No token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.type === userType.ADMIN) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as an Admin");
  }
};

const employee = (req, res, next) => {
  if (req.user && req.user.type === userType.EMPLOYEE) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as an Employee");
  }
};

const manager = (req, res, next) => {
  if (req.user && req.user.type === userType.MANAGER) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as a Manager");
  }
};

export { protect, admin, employee, manager };
