import express from "express";
const router = express.Router();
import {
  createShift,
  getShifts,
  getShiftById,
  updateShift,
  switchShift,
  getMyAllShifts,
} from "../controllers/shiftController.js";
import {
  admin,
  protect,
  employee,
  manager,
} from "../middleware/authMiddleware.js";

router.route("/switch").put(protect, switchShift);
router.route("/myAllShifts").get(protect, getMyAllShifts);
router.route("/").post(protect, manager, createShift).get(protect, getShifts);
router.route("/:id").get(protect, getShiftById).put(protect, updateShift);

export default router;
