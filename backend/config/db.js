const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    console.error('👉 Fix: Go to MongoDB Atlas → Network Access → Add IP Address → Allow 0.0.0.0/0');
    process.exit(1);
  }
};

module.exports = connectDB;
