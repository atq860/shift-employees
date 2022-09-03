import express from "express";
const router = express.Router();

import { createRequest, getMyRequests, updateRequestToAccept } from "../controllers/requestController.js";
import { protect, employee, manager } from "../middleware/authMiddleware.js";

router.route("/").post(protect, employee, createRequest).get(protect, getMyRequests)
router.route("/:id/accept").put(protect, manager, updateRequestToAccept);

export default router;

