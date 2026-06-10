const mongoose = require('mongoose');
const { SKILL_CATEGORY, SKILL_LEVEL } = require('../constants');
const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, enum: SKILL_CATEGORY, default: 'other' },
  level: { type: String, enum: SKILL_LEVEL, default: 'intermediate' },
  icon: { type: String, default: '' },
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
}, { timestamps: true });
module.exports = mongoose.model('Skill', skillSchema);
