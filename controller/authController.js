import User from "../model/User.js";
import bcrypt from "bcryptjs";
import { sendOtp } from "../model/Mail.js"
import { client } from "../config/redis.js";

//req.body must contain userName, email, password, profilePicture, phoneNumber, gender, bio 
export async function register(req, res) {
  try {
    const { email } = req.body
    const { password, ...profile } = req.body;
    const userExist = await User.findOne({email});
    if (userExist) return res.status(401).json({ message: "User Already Exist" });

    const user = await User.create({
      ...profile,
      password: bcrypt.hashSync(password, 10)
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
//req.body must contain userId
export async function getUserProfile(req, res) {
  const { userId } = req.body;
  const user = await User.findById(userId);
  res.status(200).json(user);
}
//Step 3
//req.body must contain email and password
export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User Doesn't Exist" });

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword)
      return res.status(401).json({ message: "Invalid Password" });

    user.isOnline = true;
    user.lastActive = new Date();
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//req.body must contain email and context
//context can be "Email Verification" [Register] or "Forgot Password" [Login]
export async function generateOtp(req, res) {
  try {
    const { email, context } = req.body;
    if(context=="Forgot Password"){
          const userExist = await User.findOne({email});
    if (!userExist) return res.status(404).json({ message: "User Doesn't Exist" });
    }
    const otp = (Math.random().toFixed(5) * 100000).toFixed(0).toString().padStart(5, '0')
    client.set(email, otp, { EX: 300 });
    sendOtp(context, otp, email);
res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
//req.body must contain email and otpInput
export function verifyOtp(req, res) {
  try {
    const { email, otpInput } = req.body;
    if (!client.has(email)) {
      res.status(404).json({ message: "Expired" });
    }
    const otp = client.get(email);
    if (otp != otpInput) {
      res.status(401).json({ message: "Failure" });
    }
    res.status(200).json({ message: "Success" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
