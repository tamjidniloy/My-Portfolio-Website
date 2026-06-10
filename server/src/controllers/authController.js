const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const generateToken = require("../utils/generateToken");
const env = require("../config/env");
const cookieOptions = { httpOnly: true, secure: env.nodeEnv === "production", sameSite: env.nodeEnv === "production" ? "none" : "lax", maxAge: 7 * 24 * 60 * 60 * 1000 };
exports.login = async (req,res,next)=>{ try { const {email,password}=req.body; if(!email||!password) return next(new ApiError(400,"Email and password are required.")); const user=await User.findOne({email}).select("+password"); if(!user || !(await user.comparePassword(password))) return next(new ApiError(401,"Invalid email or password.")); if(!user.isActive) return next(new ApiError(403,"This admin account is inactive.")); user.lastLogin=new Date(); await user.save({validateBeforeSave:false}); const token=generateToken(user._id); res.cookie("token",token,cookieOptions); res.status(200).json(new ApiResponse(200,"Login successful",{token,user:{id:user._id,name:user.name,email:user.email,role:user.role}})); } catch(e){ next(e); } };
exports.getMe = async (req,res,next)=>{ res.status(200).json(new ApiResponse(200,"Admin profile fetched",req.user)); };
exports.logout = async (req,res,next)=>{ res.clearCookie("token",cookieOptions); res.status(200).json(new ApiResponse(200,"Logout successful")); };
