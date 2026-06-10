const Message = require("../models/Message");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const createMessage = asyncHandler(async (req, res) => {
  const message = await Message.create(req.body);
  res
    .status(201)
    .json(new ApiResponse(201, "Message sent successfully", message));
});
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res
    .status(200)
    .json(new ApiResponse(200, "Messages fetched successfully", messages));
});
const markAsRead = asyncHandler(async (req, res, next) => {
  const message = await Message.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true },
  );
  if (!message) return next(new ApiError(404, "Message not found"));
  res.status(200).json(new ApiResponse(200, "Message marked as read", message));
});
const deleteMessage = asyncHandler(async (req, res, next) => {
  const message = await Message.findByIdAndDelete(req.params.id);
  if (!message) return next(new ApiError(404, "Message not found"));
  res
    .status(200)
    .json(new ApiResponse(200, "Message deleted successfully", message));
});
module.exports = { createMessage, getMessages, markAsRead, deleteMessage };
