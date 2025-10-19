// backend/routes/users.js (New file)
import express from "express";
import {
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { authenticate, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, isAdmin, getUsers);
router.put("/:id", authenticate, isAdmin, updateUser);
router.delete("/:id", authenticate, isAdmin, deleteUser);

export default router;
