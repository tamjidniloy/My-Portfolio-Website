const Skill = require("../models/Skill");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

exports.getAllSkills = async (req, res, next) => {
  try {
    const items = await Skill.find({ isVisible: { $ne: false } }).sort({
      order: 1,
      createdAt: -1,
    });
    res
      .status(200)
      .json(new ApiResponse(200, "skills fetched successfully", items));
  } catch (e) {
    next(e);
  }
};
exports.getAdminSkills = async (req, res, next) => {
  try {
    const items = await Skill.find().sort({ order: 1, createdAt: -1 });
    res
      .status(200)
      .json(new ApiResponse(200, "admin skills fetched successfully", items));
  } catch (e) {
    next(e);
  }
};
exports.getSkill = async (req, res, next) => {
  try {
    const item = await Skill.findOne({ _id: req.params.id });
    if (!item) return next(new ApiError(404, "Skill not found"));
    res
      .status(200)
      .json(new ApiResponse(200, "Skill fetched successfully", item));
  } catch (e) {
    next(e);
  }
};
exports.createSkill = async (req, res, next) => {
  try {
    const item = await Skill.create(req.body);
    res
      .status(201)
      .json(new ApiResponse(201, "Skill created successfully", item));
  } catch (e) {
    next(e);
  }
};
exports.updateSkill = async (req, res, next) => {
  try {
    if (req.body.title && !req.body.slug && "skill" === "project")
      req.body.slug = slugify(req.body.title);
    const item = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return next(new ApiError(404, "Skill not found"));
    res
      .status(200)
      .json(new ApiResponse(200, "Skill updated successfully", item));
  } catch (e) {
    next(e);
  }
};
exports.deleteSkill = async (req, res, next) => {
  try {
    const item = await Skill.findByIdAndDelete(req.params.id);
    if (!item) return next(new ApiError(404, "Skill not found"));
    res.status(200).json(new ApiResponse(200, "Skill deleted successfully"));
  } catch (e) {
    next(e);
  }
};
