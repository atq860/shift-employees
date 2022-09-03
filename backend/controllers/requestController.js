import Request from "../models/requestModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { userType } from "../constants/userType.js";

// @desc    Create New Request
// @route   POST /api/requests
// access   Private/Employee
const createRequest = asyncHandler(async (req, res) => {
  const { title, description, fromDate, toDate } = req.body;

  const teamManager = await User.find({ type: userType.MANAGER });

  const selectedManager = teamManager.find(
    ({ team }) => team === req.user.team
  );

  const request = new Request({
    employee: req.user._id,
    manager: selectedManager._id,
    title,
    fromDate,
    toDate,
    description,
  });

  const createdRequest = await request.save();
  res.status(201).json(createdRequest);
});

// @desc    GET Logged In User Requests
// @route   GET /api/requests
// access   Private
const getMyRequests = asyncHandler(async (req, res) => {
  if (req.user && req.user.type === userType.EMPLOYEE) {
    const requests = await Request.find({ employee: req.user._id })
      .populate("employee", "firstName lastName email")
      .sort({ createdAt: -1 });
    res.status(200).json(requests);
  } else if (req.user && req.user.type === userType.MANAGER) {
    const requests = await Request.find({ manager: req.user._id })
      .populate("employee", "firstName lastName email")
      .sort({
        createdAt: -1,
      });
    res.status(200).json(requests);
  } else {
    res.status(401).json({ msg: "Unauthorized" });
  }
  // const orders = await Order.find({ user: req.user._id });
  // res.json(orders);
});

// @desc    UPDATE Request to accepted
// @route   PUT /api/requests/:id/accept
// access   Private/Manager
const updateRequestToAccept = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id);

  if (request) {
    request.isAccepted = true;
    request.acceptedAt = Date.now();

    const updatedRequest = await request.save();
    res.json(updatedRequest);
  } else {
    res.status(404);
    throw new Error("Request Not Found");
  }
});

export { createRequest, getMyRequests, updateRequestToAccept };
