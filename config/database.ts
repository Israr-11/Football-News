import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const databaseConnection = async (): Promise<void> => {
  try {
    const options = {
      dbName: process.env.DATABASE_NAME,
    };

    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URI!, {
      ...options,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      connectTimeoutMS: 40000,
    } as mongoose.ConnectOptions);
    
    console.log('Successfully connected to Database..');
  } catch (error) {
    throw error;
  }
};
