const Project = require("../models/Project");
const f = require("./crudFactory");
module.exports = {
  getProjects: f.getAll(Project, "Projects", true),
  getAdminProjects: f.getAll(Project, "Projects"),
  getProject: f.getByIdOrSlug(Project, "Project"),
  createProject: f.createOne(Project, "Project", true),
  updateProject: f.updateOne(Project, "Project", true),
  deleteProject: f.deleteOne(Project, "Project"),
};
