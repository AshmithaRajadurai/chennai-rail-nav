import mongoose from 'mongoose';
import dns from 'dns';

// Ensure public DNS resolver is used for MongoDB SRV records on Windows networks
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Atlas Connected successfully');
    console.log(`Host: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
