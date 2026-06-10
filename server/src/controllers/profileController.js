const Profile = require("../models/Profile");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
exports.getProfile = async (req,res,next)=>{ try{ const profile=await Profile.findOne(); if(!profile) return next(new ApiError(404,"Profile not found")); res.status(200).json(new ApiResponse(200,"Profile fetched successfully",profile)); }catch(e){next(e)} };
exports.createProfile = async (req,res,next)=>{ try{ if(await Profile.findOne()) return next(new ApiError(400,"Profile already exists. Please update it.")); const profile=await Profile.create(req.body); res.status(201).json(new ApiResponse(201,"Profile created successfully",profile)); }catch(e){next(e)} };
exports.updateProfile = async (req,res,next)=>{ try{ const profile=await Profile.findOne(); if(!profile) return next(new ApiError(404,"Profile not found. Please create it first.")); const updated=await Profile.findByIdAndUpdate(profile._id,req.body,{new:true,runValidators:true}); res.status(200).json(new ApiResponse(200,"Profile updated successfully",updated)); }catch(e){next(e)} };
