import { Router } from "express";
import {   generateOtp, getUserProfile, login, register, verifyOtp } from "../controller/authController.js";
const router = Router();
router.post("/register", register);
router.post("/login", login);
router.post("/getUserProfile", getUserProfile);
router.post("/generateOtp", generateOtp);
router.post("/verifyOtp", verifyOtp);
export default router;