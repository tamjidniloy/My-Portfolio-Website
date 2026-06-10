const mongoose = require('mongoose');
const env = require('../config/env');
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Education = require('../models/Education');
const Setting = require('../models/Setting');

const seed = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    await Profile.findOneAndUpdate({}, {
      fullName: 'Tamjid Niloy', username: 'tamjidniloy', title: 'AI-Enabled Full Stack Developer',
      tagline: 'Building scalable web applications, dashboards, automation systems, and AI-powered digital solutions.',
      bio: 'I am a practical and project-focused full stack developer specializing in MERN stack development and AI-enabled web applications. I build clean, scalable, and user-friendly digital products with modern frontend design, secure backend APIs, database-driven architecture, and cloud deployment.',
      location: 'Bangladesh', email: env.adminEmail || 'tamidniloy@gmail.com',
      socialLinks: { github: '', linkedin: '', facebook: '', twitter: '', website: '' },
      techFocus: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'AI Integration'],
      availableForWork: true, yearsOfExperience: 0,
      seo: { metaTitle: 'Tamjid Niloy Portfolio | AI-Enabled Full Stack Developer', metaDescription: 'Professional portfolio of Tamjid Niloy.', keywords: ['MERN', 'React', 'Node', 'Portfolio'] }
    }, { upsert: true, new: true });
    await Setting.findOneAndUpdate({}, { siteTitle: env.siteTitle || 'Tamjid Niloy Portfolio', theme: 'dark-professional' }, { upsert: true });
    if (await Skill.countDocuments() === 0) await Skill.insertMany([
      { name: 'React.js', category: 'frontend', level: 'intermediate', order: 1 },
      { name: 'Node.js', category: 'backend', level: 'intermediate', order: 2 },
      { name: 'Express.js', category: 'backend', level: 'intermediate', order: 3 },
      { name: 'MongoDB', category: 'database', level: 'intermediate', order: 4 },
      { name: 'GitHub', category: 'tools', level: 'intermediate', order: 5 },
      { name: 'Prompt Engineering', category: 'ai', level: 'intermediate', order: 6 }
    ]);
    if (await Project.countDocuments() === 0) await Project.create({
      title: 'Editable MERN Portfolio CMS', slug: 'editable-mern-portfolio-cms', shortDescription: 'A production-style editable portfolio CMS with admin dashboard, authentication, MongoDB and Cloudinary.',
      description: 'This project demonstrates full stack architecture, CRUD APIs, admin dashboard logic, database modeling, authentication, and deployment-ready structure.',
      problem: 'Static portfolios are hard to update without editing code.', solution: 'A CMS-based portfolio allows admin-controlled editing of profile, projects, skills and messages.',
      features: ['Admin authentication', 'Profile management', 'Project CRUD', 'Skill CRUD', 'Contact messages', 'Cloudinary upload'], techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary'], featured: true, order: 1
    });
    if (await Experience.countDocuments() === 0) await Experience.create({ company: 'Self-directed Projects', position: 'MERN Stack Developer', employmentType: 'Personal Project', isCurrent: true, description: 'Built production-style MERN projects with authentication, CRUD, admin dashboards and deployment-ready architecture.', responsibilities: ['Frontend development', 'REST API development', 'MongoDB modeling'], technologies: ['React', 'Node.js', 'MongoDB'], order: 1 });
    if (await Education.countDocuments() === 0) await Education.create({ institution: 'Your University', degree: 'B.Sc. in Computer Science and Engineering', field: 'Computer Science', startYear: 2022, endYear: 2026, description: 'Replace this with your real education information.', order: 1 });
    console.log('Sample data seeded successfully');
    process.exit(0);
  } catch (error) { console.error(error.message); process.exit(1); }
};
seed();
