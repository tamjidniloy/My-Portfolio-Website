const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const env = require("../config/env");
const protect = async (req, res, next) => {
  try {
    let token = req.cookies?.token;
    if (!token && req.headers.authorization?.startsWith("Bearer")) token = req.headers.authorization.split(" ")[1];
    if (!token) return next(new ApiError(401, "Not authorized. Please login first."));
    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(decoded.id).select("-password");
    if (!user || !user.isActive) return next(new ApiError(401, "User not found or inactive."));
    req.user = user;
    next();
  } catch (error) { next(new ApiError(401, "Invalid or expired token.")); }
};
module.exports = { protect };
