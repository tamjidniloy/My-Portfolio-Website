const Experience = require("../models/Experience");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

exports.getAllExperiences = async (req,res,next)=>{ try{ const items=await Experience.find({ isVisible: { $ne: false } }).sort({ order:1, createdAt:-1 }); res.status(200).json(new ApiResponse(200,"experiences fetched successfully",items)); }catch(e){next(e)} };
exports.getAdminExperiences = async (req,res,next)=>{ try{ const items=await Experience.find().sort({ order:1, createdAt:-1 }); res.status(200).json(new ApiResponse(200,"admin experiences fetched successfully",items)); }catch(e){next(e)} };
exports.getExperience = async (req,res,next)=>{ try{ const item=await Experience.findOne({ _id: req.params.id }); if(!item) return next(new ApiError(404,"Experience not found")); res.status(200).json(new ApiResponse(200,"Experience fetched successfully",item)); }catch(e){next(e)} };
exports.createExperience = async (req,res,next)=>{ try{  const item=await Experience.create(req.body); res.status(201).json(new ApiResponse(201,"Experience created successfully",item)); }catch(e){next(e)} };
exports.updateExperience = async (req,res,next)=>{ try{ if(req.body.title && !req.body.slug && "experience"==="project") req.body.slug = slugify(req.body.title); const item=await Experience.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true}); if(!item) return next(new ApiError(404,"Experience not found")); res.status(200).json(new ApiResponse(200,"Experience updated successfully",item)); }catch(e){next(e)} };
exports.deleteExperience = async (req,res,next)=>{ try{ const item=await Experience.findByIdAndDelete(req.params.id); if(!item) return next(new ApiError(404,"Experience not found")); res.status(200).json(new ApiResponse(200,"Experience deleted successfully")); }catch(e){next(e)} };
