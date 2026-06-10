const Setting = require("../models/Setting");
const ApiResponse = require("../utils/ApiResponse");
exports.getSettings = async (req, res, next) => {
  try {
    let setting = await Setting.findOne();
    if (!setting) setting = await Setting.create({});
    res
      .status(200)
      .json(new ApiResponse(200, "Settings fetched successfully", setting));
  } catch (e) {
    next(e);
  }
};
exports.updateSettings = async (req, res, next) => {
  try {
    let setting = await Setting.findOne();
    if (!setting) setting = await Setting.create(req.body);
    else
      setting = await Setting.findByIdAndUpdate(setting._id, req.body, {
        new: true,
        runValidators: true,
      });
    res
      .status(200)
      .json(new ApiResponse(200, "Settings updated successfully", setting));
  } catch (e) {
    next(e);
  }
};
