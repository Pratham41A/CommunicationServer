import { Router } from "express";
import {   checkIsUserExist, generateOtp, getUserProfile, login, register, verifyOtp } from "../controller/authController.js";
const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/getUserProfile", getUserProfile);
router.post("/generateOtp", generateOtp);
router.post("/verifyOtp", verifyOtp);
router.post('/checkIsUserExist',checkIsUserExist)
export default router;