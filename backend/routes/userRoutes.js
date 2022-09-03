import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  putRequestToDelete,
} from "../controllers/userController.js";
import { admin, manager, protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, admin, registerUser).get(protect, getUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, getUserById)
  .put(protect, admin, updateUser);

router.route("/:id/delete").put(protect, manager, putRequestToDelete);

export default router;
