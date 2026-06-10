const Skill = require('../models/Skill');
const f = require('./crudFactory');
module.exports = {
  getSkills: f.getAll(Skill, 'Skills', true),
  getAdminSkills: f.getAll(Skill, 'Skills'),
  createSkill: f.createOne(Skill, 'Skill'),
  updateSkill: f.updateOne(Skill, 'Skill'),
  deleteSkill: f.deleteOne(Skill, 'Skill'),
};
