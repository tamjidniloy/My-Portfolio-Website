const Experience = require('../models/Experience');
const f = require('./crudFactory');
module.exports = {
  getExperiences: f.getAll(Experience, 'Experiences', true),
  getAdminExperiences: f.getAll(Experience, 'Experiences'),
  createExperience: f.createOne(Experience, 'Experience'),
  updateExperience: f.updateOne(Experience, 'Experience'),
  deleteExperience: f.deleteOne(Experience, 'Experience'),
};
