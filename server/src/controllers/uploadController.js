const fs = require("fs");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { uploadToCloudinary } = require("../utils/cloudinaryHelper");
exports.uploadFile = async (req,res,next)=>{ try{ if(!req.file) return next(new ApiError(400,"No file uploaded")); const folder=req.body.folder || "portfolio"; const result=await uploadToCloudinary(req.file.path, folder); fs.unlinkSync(req.file.path); res.status(201).json(new ApiResponse(201,"File uploaded successfully",result)); }catch(e){ if(req.file?.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path); next(e); } };
