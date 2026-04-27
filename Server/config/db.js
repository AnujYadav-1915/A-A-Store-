const mongoose = require('mongoose');

let isConnected = false; // Connection cache

const connectDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    // console.log('Using existing MongoDB connection');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "naklizon", // Explicitly setting DB name
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState;
    console.log('MongoDB Connected successfully');
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
  }
}

module.exports = connectDB;