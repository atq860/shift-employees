import Shift from "../models/shiftModel.js";
import asyncHandler from "express-async-handler";

// @desc    Create New Schedule for an Employee
// @route   POST /api/shifts
// access   Private
const createShift = asyncHandler(async (req, res) => {
  const {
    employee,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  } = req.body;

  const shift = new Shift({
    manager: req.user._id,
    employee,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  });

  const createdShift = await shift.save();
  res.status(201).json(createdShift);
});

// @desc    GET all shifts
// @route   GET /api/shifts
// access   Private
const getShifts = asyncHandler(async (req, res) => {
  const shifts = await Shift.find({})
    .sort({ createdAt: -1 })
    .populate("employee", "firstName lastName email phone jobPosition team");

  let weeklyshifts = [];

  shifts.map((shift) => {
    const date1 = shift.createdAt;
    const date2 = new Date().toISOString();

    const DAY_UNIT_IN_MILLISECONDS = 24 * 3600 * 1000;

    const diffInMilliseconds =
      new Date(date2).getTime() - new Date(date1).getTime();
    const diffInDays = diffInMilliseconds / DAY_UNIT_IN_MILLISECONDS;

    if (diffInDays <= 7) {
      weeklyshifts.push(shift);
    }
  });

  res.json(weeklyshifts);
});

// @desc    GET my all shifts
// @route   GET /api/shifts/all
// access   Private
const getMyAllShifts = asyncHandler(async (req, res) => {
  const shifts = await Shift.find({ employee: req.user._id })
    .sort({
      createdAt: -1,
    })
    .populate("employee", "firstName lastName email phone jobPosition team");

  res.json(shifts);
});

// Fetch it with Users Idz
// @desc    Fetch Single Shift
// @route   GET /api/shifts/:id
// access   Private
const getShiftById = asyncHandler(async (req, res) => {
  const shift = await Shift.findById(req.params.id);
  // .populate(
  //   "user",
  //   "name email type createdAt"
  // );

  if (shift) {
    res.json(shift);
  } else {
    res.status(404);
    throw new Error("Shift Not Found");
  }
});

// @desc    Update a Shift
// @route   PUT /api/shifts/:id
// access   Private
const updateShift = asyncHandler(async (req, res) => {
  const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } =
    req.body;

  const shift = await Shift.findById(req.params.id);

  if (shift) {
    shift.monday = monday || shift.monday;
    shift.tuesday = tuesday || shift.tuesday;
    shift.wednesday = wednesday || shift.wednesday;
    shift.thursday = thursday || shift.thursday;
    shift.friday = friday || shift.friday;
    shift.saturday = saturday || shift.saturday;
    shift.sunday = sunday || shift.sunday;

    const updatedShift = await shift.save();
    res.json(updatedShift);
  } else {
    res.status(404);
    throw new Error("Shift Not Found");
  }
});

// @desc    Switch Shift between 2 Employees
// @route   PUT /api/shifts/switch
// access   Private
const switchShift = asyncHandler(async (req, res) => {
  const { employeeId, shiftDay } = req.body;

  console.log("day ", shiftDay.valueOf());

  const targettedEmployeeShift = await Shift.findOne({
    employee: employeeId,
  }).sort({ createdAt: -1 });

  const requestedEmployeeShift = await Shift.findOne({
    employee: req.user._id,
  }).sort({ createdAt: -1 });

  if (targettedEmployeeShift && requestedEmployeeShift) {
    if (shiftDay === "monday") {
      // Swap the shifts
      const monday = targettedEmployeeShift.monday;

      targettedEmployeeShift.monday = requestedEmployeeShift.monday;
      requestedEmployeeShift.monday = monday;

      await targettedEmployeeShift.save();
      await requestedEmployeeShift.save();

      res.json({
        message: "Shifts are Switched",
        targettedEmployeeShift,
        requestedEmployeeShift,
      });
    } else if (shiftDay === "tuesday") {
      // Swap the shifts
      const tuesday = targettedEmployeeShift.tuesday;

      targettedEmployeeShift.tuesday = requestedEmployeeShift.tuesday;
      requestedEmployeeShift.tuesday = tuesday;

      await targettedEmployeeShift.save();
      await requestedEmployeeShift.save();

      res.json({
        message: "Shifts are Switched",
        targettedEmployeeShift,
        requestedEmployeeShift,
      });
    } else if (shiftDay === "wednesday") {
      // Swap the shifts
      const wednesday = targettedEmployeeShift.wednesday;

      targettedEmployeeShift.wednesday = requestedEmployeeShift.wednesday;
      requestedEmployeeShift.wednesday = wednesday;

      await targettedEmployeeShift.save();
      await requestedEmployeeShift.save();

      res.json({
        message: "Shifts are Switched",
        targettedEmployeeShift,
        requestedEmployeeShift,
      });
    } else if (shiftDay === "thursday") {
      // Swap the shifts
      const thursday = targettedEmployeeShift.thursday;

      targettedEmployeeShift.thursday = requestedEmployeeShift.thursday;
      requestedEmployeeShift.thursday = thursday;

      await targettedEmployeeShift.save();
      await requestedEmployeeShift.save();

      res.json({
        message: "Shifts are Switched",
        targettedEmployeeShift,
        requestedEmployeeShift,
      });
    } else if (shiftDay === "friday") {
      // Swap the shifts
      const friday = targettedEmployeeShift.friday;

      targettedEmployeeShift.friday = requestedEmployeeShift.friday;
      requestedEmployeeShift.friday = friday;

      await targettedEmployeeShift.save();
      await requestedEmployeeShift.save();

      res.json({
        message: "Shifts are Switched",
        targettedEmployeeShift,
        requestedEmployeeShift,
      });
    } else if (shiftDay === "saturday") {
      // Swap the shifts
      const saturday = targettedEmployeeShift.saturday;

      targettedEmployeeShift.saturday = requestedEmployeeShift.saturday;
      requestedEmployeeShift.saturday = saturday;

      await targettedEmployeeShift.save();
      await requestedEmployeeShift.save();

      res.json({
        message: "Shifts are Switched",
        targettedEmployeeShift,
        requestedEmployeeShift,
      });
    } else if (shiftDay === "sunday") {
      // Swap the shifts
      const sunday = targettedEmployeeShift.sunday;

      targettedEmployeeShift.sunday = requestedEmployeeShift.sunday;
      requestedEmployeeShift.sunday = sunday;

      await targettedEmployeeShift.save();
      await requestedEmployeeShift.save();

      res.json({
        message: "Shifts are Switched",
        targettedEmployeeShift,
        requestedEmployeeShift,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Shift Day");
    }
  } else {
    res.status(404);
    throw new Error("Shift Not Found");
  }
});

export {
  createShift,
  getShifts,
  getShiftById,
  updateShift,
  switchShift,
  getMyAllShifts,
};
