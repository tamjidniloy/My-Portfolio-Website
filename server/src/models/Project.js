const mongoose = require("mongoose");
const fileSchema = { url: { type: String, default: "" }, publicId: { type: String, default: "" } };
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 140 },
  slug: { type: String, required: true, unique: true, lowercase: true, index: true },
  shortDescription: { type: String, required: true, maxlength: 300 },
  description: { type: String, maxlength: 5000 },
  problem: String,
  solution: String,
  features: [String],
  techStack: [String],
  category: { type: String, default: "Web Application" },
  image: fileSchema,
  screenshots: [fileSchema],
  liveUrl: String,
  githubUrl: String,
  status: { type: String, enum: ["completed", "ongoing", "planned"], default: "completed" },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
}, { timestamps: true });
module.exports = mongoose.model("Project", projectSchema);
