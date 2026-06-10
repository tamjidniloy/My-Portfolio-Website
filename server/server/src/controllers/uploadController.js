const fs = require('fs');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinaryHelper');

const uploadFile = asyncHandler(async (req, res, next) => {
  if (!req.file) return next(new ApiError(400, 'No file uploaded.'));
  const folder = req.body.folder || 'portfolio-cms';
  const result = await uploadToCloudinary(req.file.path, folder);
  fs.unlink(req.file.path, () => {});
  res.status(201).json(new ApiResponse(201, 'File uploaded successfully', {
    url: result.secure_url,
    publicId: result.public_id,
    resourceType: result.resource_type,
    format: result.format,
  }));
});
const deleteFile = asyncHandler(async (req, res) => {
  const { publicId, resourceType } = req.body;
  const result = await deleteFromCloudinary(publicId, resourceType || 'image');
  res.status(200).json(new ApiResponse(200, 'File deleted successfully', result));
});
module.exports = { uploadFile, deleteFile };
