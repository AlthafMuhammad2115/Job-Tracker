require('dotenv').config();
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoString);
    console.log('Database Connected');
  } catch (error) {
    console.error('Database connection error:', error.message || error);
    process.exit(1);
  }
};

module.exports = { connectDB };
