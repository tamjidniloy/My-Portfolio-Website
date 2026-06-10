const Message = require("../models/Message");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
exports.createMessage = async (req, res, next) => {
  try {
    const msg = await Message.create(req.body);
    res
      .status(201)
      .json(new ApiResponse(201, "Message sent successfully", msg));
  } catch (e) {
    next(e);
  }
};
exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json(new ApiResponse(200, "Messages fetched successfully", messages));
  } catch (e) {
    next(e);
  }
};
exports.markRead = async (req, res, next) => {
  try {
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true },
    );
    if (!msg) return next(new ApiError(404, "Message not found"));
    res.status(200).json(new ApiResponse(200, "Message marked as read", msg));
  } catch (e) {
    next(e);
  }
};
exports.deleteMessage = async (req, res, next) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg) return next(new ApiError(404, "Message not found"));
    res.status(200).json(new ApiResponse(200, "Message deleted successfully"));
  } catch (e) {
    next(e);
  }
};
