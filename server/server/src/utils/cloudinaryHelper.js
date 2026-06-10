const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (filePath, folder = 'portfolio-cms') => {
  return cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: 'auto',
  });
};

const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  if (!publicId) return null;
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };
