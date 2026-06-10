const Project = require("../models/Project");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const slugify = require("../utils/slugify");
exports.getAllProjects = async (req, res, next) => {
  try {
    const items = await Project.find({ isVisible: { $ne: false } }).sort({
      order: 1,
      createdAt: -1,
    });
    res
      .status(200)
      .json(new ApiResponse(200, "projects fetched successfully", items));
  } catch (e) {
    next(e);
  }
};
exports.getAdminProjects = async (req, res, next) => {
  try {
    const items = await Project.find().sort({ order: 1, createdAt: -1 });
    res
      .status(200)
      .json(new ApiResponse(200, "admin projects fetched successfully", items));
  } catch (e) {
    next(e);
  }
};
exports.getProjectBySlug = async (req, res, next) => {
  try {
    const item = await Project.findOne({ slug: req.params.slugOrId });
    if (!item) return next(new ApiError(404, "Project not found"));
    res
      .status(200)
      .json(new ApiResponse(200, "Project fetched successfully", item));
  } catch (e) {
    next(e);
  }
};
exports.createProject = async (req, res, next) => {
  try {
    if (!req.body.slug) req.body.slug = slugify(req.body.title);
    const item = await Project.create(req.body);
    res
      .status(201)
      .json(new ApiResponse(201, "Project created successfully", item));
  } catch (e) {
    next(e);
  }
};
exports.updateProject = async (req, res, next) => {
  try {
    if (req.body.title && !req.body.slug && "project" === "project")
      req.body.slug = slugify(req.body.title);
    const item = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return next(new ApiError(404, "Project not found"));
    res
      .status(200)
      .json(new ApiResponse(200, "Project updated successfully", item));
  } catch (e) {
    next(e);
  }
};
exports.deleteProject = async (req, res, next) => {
  try {
    const item = await Project.findByIdAndDelete(req.params.id);
    if (!item) return next(new ApiError(404, "Project not found"));
    res.status(200).json(new ApiResponse(200, "Project deleted successfully"));
  } catch (e) {
    next(e);
  }
};
