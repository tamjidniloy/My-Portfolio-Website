const mongoose = require("mongoose");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Skill = require("../models/Skill");
const Setting = require("../models/Setting");
const env = require("../config/env");
const seedAdmin = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    if (!env.adminEmail || !env.adminPassword)
      throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD missing");
    let admin = await User.findOne({ email: env.adminEmail });
    if (!admin) {
      admin = await User.create({
        name: "Tamjid Niloy",
        email: env.adminEmail,
        password: env.adminPassword,
        role: "admin",
      });
      console.log("Admin created successfully");
    } else console.log("Admin already exists");
    if (!(await Profile.findOne()))
      await Profile.create({
        fullName: "Tamjid Niloy",
        username: "tamjidniloy",
        title: "AI-Enabled Full Stack Developer",
        tagline:
          "Building scalable web applications, dashboards, automation systems, and AI-powered digital solutions.",
        bio: "I am a project-focused full stack developer specializing in MERN stack development and AI-enabled web applications. I build clean, scalable, and user-friendly digital products with modern frontend design, secure backend APIs, database-driven architecture, and cloud deployment.",
        location: "Bangladesh",
        email: env.adminEmail,
        techFocus: [
          "React.js",
          "Node.js",
          "Express.js",
          "MongoDB",
          "AI Integration",
          "REST API",
          "Dashboard Development",
        ],
        availableForWork: true,
        yearsOfExperience: 0,
        seo: {
          metaTitle: "Tamjid Niloy Portfolio | AI-Enabled Full Stack Developer",
          metaDescription: "Professional portfolio of Tamjid Niloy.",
          keywords: ["Tamjid Niloy", "MERN Developer", "Full Stack Developer"],
        },
      });
    if ((await Skill.countDocuments()) === 0)
      await Skill.insertMany([
        { name: "React.js", category: "frontend", level: "advanced", order: 1 },
        {
          name: "JavaScript",
          category: "frontend",
          level: "advanced",
          order: 2,
        },
        {
          name: "Tailwind CSS",
          category: "frontend",
          level: "advanced",
          order: 3,
        },
        {
          name: "Node.js",
          category: "backend",
          level: "intermediate",
          order: 4,
        },
        {
          name: "Express.js",
          category: "backend",
          level: "intermediate",
          order: 5,
        },
        {
          name: "MongoDB",
          category: "database",
          level: "intermediate",
          order: 6,
        },
        {
          name: "Git & GitHub",
          category: "tools",
          level: "intermediate",
          order: 7,
        },
        {
          name: "Vercel",
          category: "deployment",
          level: "intermediate",
          order: 8,
        },
        {
          name: "Render",
          category: "deployment",
          level: "intermediate",
          order: 9,
        },
        {
          name: "Prompt Engineering",
          category: "ai",
          level: "advanced",
          order: 10,
        },
      ]);
    if (!(await Setting.findOne()))
      await Setting.create({
        siteTitle: env.siteTitle,
        siteDescription: "Modern SaaS-style developer portfolio CMS",
        theme: "dark",
      });
    process.exit(0);
  } catch (error) {
    console.error(`Seed failed: ${error.message}`);
    process.exit(1);
  }
};
seedAdmin();
