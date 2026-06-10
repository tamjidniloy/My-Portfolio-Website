const mongoose = require("mongoose");
const { PROJECT_STATUS } = require("../constants");
const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    description: { type: String, trim: true },
    problem: String,
    solution: String,
    features: [String],
    techStack: [String],
    category: { type: String, default: "Web Application" },
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    screenshots: [{ url: String, publicId: String }],
    liveUrl: String,
    githubUrl: String,
    status: { type: String, enum: PROJECT_STATUS, default: "completed" },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Project", projectSchema);
