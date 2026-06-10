const cloudinary = require("../config/cloudinary");
const uploadToCloudinary = async (filePath, folder = "portfolio") => {
  const result = await cloudinary.uploader.upload(filePath, { folder, resource_type: "auto" });
  return { url: result.secure_url, publicId: result.public_id };
};
const deleteFromCloudinary = async (publicId, resourceType = "image") => {
  if (!publicId) return null;
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
};
module.exports = { uploadToCloudinary, deleteFromCloudinary };
