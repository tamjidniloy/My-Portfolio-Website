const Setting = require("../models/Setting");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getSettings = asyncHandler(async (req, res) => {
  const settings = await Setting.findOne();
  res
    .status(200)
    .json(new ApiResponse(200, "Settings fetched successfully", settings));
});
const upsertSettings = asyncHandler(async (req, res) => {
  const settings = await Setting.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  });
  res
    .status(200)
    .json(new ApiResponse(200, "Settings saved successfully", settings));
});
module.exports = { getSettings, upsertSettings };
