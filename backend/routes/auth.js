import express from "express";
import { signup, login, getMe, updateMe, changePassword } from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authenticate, getMe);
router.put("/me", authenticate, updateMe);
router.post("/change-password", authenticate, changePassword);

export default router;
