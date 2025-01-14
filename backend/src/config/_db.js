import mongoose from 'mongoose';
import { env } from '../env.js';


const connectDB = async () => {
  try {
    await mongoose.connect(env().MONGOURI);
    console.log('MongoDB Atlas connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error.message);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;