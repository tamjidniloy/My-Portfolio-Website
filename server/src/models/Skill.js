const mongoose = require("mongoose");
const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: [
        "frontend",
        "backend",
        "database",
        "ai",
        "tools",
        "deployment",
        "soft-skill",
      ],
      required: true,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "intermediate",
    },
    icon: String,
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Skill", skillSchema);
