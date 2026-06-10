const mongoose = require("mongoose");
const settingSchema = new mongoose.Schema(
  {
    siteTitle: { type: String, default: "Portfolio CMS" },
    siteDescription: String,
    keywords: [String],
    theme: { type: String, default: "dark-professional" },
    primaryColor: { type: String, default: "#06b6d4" },
    accentColor: { type: String, default: "#8b5cf6" },
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
