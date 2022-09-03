import Announcement from "../models/announcementModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { userType } from "../constants/userType.js";

// @desc    Create New Announcement
// @route   POST /api/announcements
// access   Private/Manager
const createAnnouncement = asyncHandler(async (req, res) => {
  const { title, announcement } = req.body;

  const newAnnouncement = new Announcement({
    manager: req.user._id,
    managerTeam: req.user.team,
    title,
    announcement,
  });

  const createdAnnouncement = await newAnnouncement.save();
  res.status(201).json(createdAnnouncement);
});

// @desc    GET Announcements
// @route   GET /api/announcements
// access   Private
const getAnnouncements = asyncHandler(async (req, res) => {
  if (req.user && req.user.type === userType.EMPLOYEE) {
    const announcements = await Announcement.find({
      managerTeam: req.user.team,
    })
      .populate("manager", "firstName lastName email")
      .sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } else if (req.user && req.user.type === userType.MANAGER) {
    const announcements = await Announcement.find({ manager: req.user._id })
      // .populate("employee", "firstName lastName email")
      .sort({
        createdAt: -1,
      });
    res.status(200).json(announcements);
  } else {
    res.status(401).json({ msg: "Unauthorized" });
  }
  // const orders = await Order.find({ user: req.user._id });
  // res.json(orders);
});

export { createAnnouncement, getAnnouncements };
