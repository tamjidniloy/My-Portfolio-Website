const mongoose = require("mongoose");
const User = require("../models/User");
const env = require("../config/env");

const seedAdmin = async () => {
  try {
    if (!env.mongoUri) throw new Error("MONGO_URI missing");
    if (!env.adminEmail || !env.adminPassword)
      throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD missing");
    await mongoose.connect(env.mongoUri);
    const existing = await User.findOne({ email: env.adminEmail });
    if (existing) {
      console.log("Admin already exists");
      process.exit(0);
    }
    await User.create({
      name: env.adminName,
      email: env.adminEmail,
      password: env.adminPassword,
      role: "admin",
    });
    console.log("Admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error(`Admin seed failed: ${error.message}`);
    process.exit(1);
  }
};
seedAdmin();
