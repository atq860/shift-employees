import express from "express";
const router = express.Router();
import {
  createAnnouncement,
  getAnnouncements,
} from "../controllers/announcementController.js";
import { protect, manager } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(protect, manager, createAnnouncement)
  .get(protect, getAnnouncements);

export default router;
