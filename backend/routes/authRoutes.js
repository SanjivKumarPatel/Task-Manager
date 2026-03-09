import express from "express";
import { registerUser, registerLogin } from "../controllers/authController.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", registerLogin);
export default router;
