const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const slugify = require("../utils/slugify");

const getAll = (Model, label, publicOnly = false) =>
  asyncHandler(async (req, res) => {
    const filter = publicOnly ? { isVisible: { $ne: false } } : {};
    const docs = await Model.find(filter).sort({ order: 1, createdAt: -1 });
    res
      .status(200)
      .json(new ApiResponse(200, `${label} fetched successfully`, docs));
  });

const getByIdOrSlug = (Model, label) =>
  asyncHandler(async (req, res, next) => {
    const key = req.params.idOrSlug;
    const query = /^[0-9a-fA-F]{24}$/.test(key) ? { _id: key } : { slug: key };
    const doc = await Model.findOne(query);
    if (!doc) return next(new ApiError(404, `${label} not found`));
    res
      .status(200)
      .json(new ApiResponse(200, `${label} fetched successfully`, doc));
  });

const createOne = (Model, label, makeSlug = false) =>
  asyncHandler(async (req, res) => {
    const payload = { ...req.body };
    if (makeSlug && !payload.slug && payload.title)
      payload.slug = slugify(payload.title);
    const doc = await Model.create(payload);
    res
      .status(201)
      .json(new ApiResponse(201, `${label} created successfully`, doc));
  });

const updateOne = (Model, label, makeSlug = false) =>
  asyncHandler(async (req, res, next) => {
    const payload = { ...req.body };
    if (makeSlug && payload.title && !payload.slug)
      payload.slug = slugify(payload.title);
    const doc = await Model.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    if (!doc) return next(new ApiError(404, `${label} not found`));
    res
      .status(200)
      .json(new ApiResponse(200, `${label} updated successfully`, doc));
  });

const deleteOne = (Model, label) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return next(new ApiError(404, `${label} not found`));
    res
      .status(200)
      .json(new ApiResponse(200, `${label} deleted successfully`, doc));
  });

module.exports = { getAll, getByIdOrSlug, createOne, updateOne, deleteOne };
