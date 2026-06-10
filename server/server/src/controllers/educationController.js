const Education = require('../models/Education');
const f = require('./crudFactory');
module.exports = {
  getEducations: f.getAll(Education, 'Educations', true),
  getAdminEducations: f.getAll(Education, 'Educations'),
  createEducation: f.createOne(Education, 'Education'),
  updateEducation: f.updateOne(Education, 'Education'),
  deleteEducation: f.deleteOne(Education, 'Education'),
};
