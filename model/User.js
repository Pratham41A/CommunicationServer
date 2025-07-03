import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: "" },
  phoneNumber: { type: String, default: "" }, 
  gender: { type: String, enum: ["male", "female", "other"], default: "other" },
  bio: { type: String, default: "" },
  lastActive: { type: Date },
  isOnline: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
});





 const User= mongoose.model('User', userSchema);
export default User;