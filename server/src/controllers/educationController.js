const Education = require("../models/Education");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

exports.getAllEducations = async (req,res,next)=>{ try{ const items=await Education.find({ isVisible: { $ne: false } }).sort({ order:1, createdAt:-1 }); res.status(200).json(new ApiResponse(200,"educations fetched successfully",items)); }catch(e){next(e)} };
exports.getAdminEducations = async (req,res,next)=>{ try{ const items=await Education.find().sort({ order:1, createdAt:-1 }); res.status(200).json(new ApiResponse(200,"admin educations fetched successfully",items)); }catch(e){next(e)} };
exports.getEducation = async (req,res,next)=>{ try{ const item=await Education.findOne({ _id: req.params.id }); if(!item) return next(new ApiError(404,"Education not found")); res.status(200).json(new ApiResponse(200,"Education fetched successfully",item)); }catch(e){next(e)} };
exports.createEducation = async (req,res,next)=>{ try{  const item=await Education.create(req.body); res.status(201).json(new ApiResponse(201,"Education created successfully",item)); }catch(e){next(e)} };
exports.updateEducation = async (req,res,next)=>{ try{ if(req.body.title && !req.body.slug && "education"==="project") req.body.slug = slugify(req.body.title); const item=await Education.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true}); if(!item) return next(new ApiError(404,"Education not found")); res.status(200).json(new ApiResponse(200,"Education updated successfully",item)); }catch(e){next(e)} };
exports.deleteEducation = async (req,res,next)=>{ try{ const item=await Education.findByIdAndDelete(req.params.id); if(!item) return next(new ApiError(404,"Education not found")); res.status(200).json(new ApiResponse(200,"Education deleted successfully")); }catch(e){next(e)} };
