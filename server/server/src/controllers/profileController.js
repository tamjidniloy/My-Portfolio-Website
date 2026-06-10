const Profile = require("../models/Profile");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne();
  if (!profile) return next(new ApiError(404, "Profile not found"));
  res
    .status(200)
    .json(new ApiResponse(200, "Profile fetched successfully", profile));
});
const upsertProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  });
  res
    .status(200)
    .json(new ApiResponse(200, "Profile saved successfully", profile));
});
module.exports = { getProfile, upsertProfile };
