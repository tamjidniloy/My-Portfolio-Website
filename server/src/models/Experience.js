const mongoose = require("mongoose");
const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true, trim: true },
  position: { type: String, required: true, trim: true },
  employmentType: { type: String, default: "Project" },
  location: String,
  startDate: Date,
  endDate: Date,
  isCurrent: { type: Boolean, default: false },
  description: String,
  responsibilities: [String],
  technologies: [String],
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
}, { timestamps: true });
module.exports = mongoose.model("Experience", experienceSchema);
