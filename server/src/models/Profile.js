const mongoose = require("mongoose");
const fileSchema = { url: { type: String, default: "" }, publicId: { type: String, default: "" } };
const profileSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true, maxlength: 100 },
  username: { type: String, trim: true, lowercase: true, maxlength: 60 },
  title: { type: String, required: true, trim: true, maxlength: 120 },
  tagline: { type: String, trim: true, maxlength: 220 },
  bio: { type: String, trim: true, maxlength: 4000 },
  location: { type: String, trim: true, maxlength: 120 },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  profileImage: fileSchema,
  resume: fileSchema,
  socialLinks: { github: String, linkedin: String, facebook: String, twitter: String, website: String },
  techFocus: [{ type: String, trim: true }],
  availableForWork: { type: Boolean, default: true },
  yearsOfExperience: { type: Number, default: 0, min: 0 },
  seo: { metaTitle: String, metaDescription: String, keywords: [String] },
}, { timestamps: true });
module.exports = mongoose.model("Profile", profileSchema);
