const mongoose = require("mongoose");
const settingSchema = new mongoose.Schema(
  {
    siteTitle: { type: String, default: "Tamjid Niloy Portfolio" },
    siteDescription: String,
    keywords: [String],
    theme: { type: String, default: "dark" },
    maintenanceMode: { type: Boolean, default: false },
    socialLinks: {
      github: String,
      linkedin: String,
      facebook: String,
      twitter: String,
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Setting", settingSchema);
