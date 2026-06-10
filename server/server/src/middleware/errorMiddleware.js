const ApiError = require("../utils/ApiError");

const errorMiddleware = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    error = new ApiError(statusCode, message);
  }

  if (err.name === "CastError")
    error = new ApiError(400, "Invalid resource id.");
  if (err.code === 11000)
    error = new ApiError(
      409,
      `Duplicate value: ${Object.keys(err.keyValue || {}).join(", ")}`,
    );
  if (err.name === "ValidationError")
    error = new ApiError(
      400,
      "Validation failed.",
      Object.values(err.errors).map((e) => e.message),
    );
  if (err.name === "JsonWebTokenError")
    error = new ApiError(401, "Invalid token.");
  if (err.name === "TokenExpiredError")
    error = new ApiError(401, "Token expired.");

  res.status(error.statusCode || 500).json({
    success: false,
    statusCode: error.statusCode || 500,
    message: error.message,
    errors: error.errors || [],
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
  });
};

module.exports = errorMiddleware;
