const multer = require("multer");
const path = require("path");
const ApiError = require("../utils/ApiError");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "src/uploads"),
  filename: (req, file, cb) =>
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`,
    ),
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
    "application/pdf",
  ];
  if (allowed.includes(file.mimetype)) return cb(null, true);
  cb(
    new ApiError(400, "Only JPG, PNG, WEBP images and PDF files are allowed."),
  );
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
module.exports = upload;
