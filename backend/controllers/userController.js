import User from "../models/userModel.js";
import Shift from "../models/shiftModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { userType } from "../constants/userType.js";

// @desc    Auth User & Get Token
// @route   POST /api/users/login
// access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      jobPosition: user.jobPosition,
      team: user.team,
      type: user.type,
      token: generateToken(user._id),
    });
  } else {
    res.status(401); // 401 is unauthorized
    throw new Error("Invalid Email Or Password");
  }
});

// @desc    Register a new User
// @route   POST /api/users
// access   Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    jobPosition,
    team,
    type,
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    type,
    phone,
    jobPosition,
    team,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      type: user.type,
      // token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc    GET User Profile
// @route   GET /api/users/profile
// access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // Current Logged in User

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc    UPDATE User Profile
// @route   PUT /api/users/profile
// access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // Current Logged in User

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.phone = req.body.phone || user.phone;
    user.jobPosition = req.body.jobPosition || user.jobPosition;
    user.team = req.body.team || user.team;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      jobPosition: updatedUser.jobPosition,
      team: updatedUser.team,
      type: updatedUser.type,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc    GET all users
// @route   GET /api/users
// access   Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    DELETE User
// @route   DELETE /api/users/:id
// access   Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const shifts = await Shift.find({ employee: req.params.id });

  if (user) {
    await user.remove();
    shifts.forEach((shift) => {
      shift.remove();
    });
    res.json({ message: "User Removed" });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc    GET user By ID
// @route   GET /api/users/:id
// access   Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc    UPDATE User
// @route   PUT /api/users/:id
// access   Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.phone = req.body.phone || user.phone;
    user.jobPosition = req.body.jobPosition || user.jobPosition;
    user.team = req.body.team || user.team;
    user.type = req.body.type || user.type;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      type: updatedUser.type,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc    POST Request to delete
// @route   PUT /api/users/:id/delete
// access   Private/Manager
const putRequestToDelete = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.deleteRequest = true;

    const deletionRequest = await user.save();
    res.json(deletionRequest);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  putRequestToDelete
};
