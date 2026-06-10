const mongoose = require("mongoose");
const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true, trim: true },
  degree: { type: String, required: true, trim: true },
  field: String,
  startYear: Number,
  endYear: Number,
  result: String,
  description: String,
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
}, { timestamps: true });
module.exports = mongoose.model("Education", educationSchema);
