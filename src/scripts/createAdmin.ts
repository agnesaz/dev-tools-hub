import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Admin from '../models/admin.model';
import { logger } from '../utils/logger';

dotenv.config();

const createAdmin = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dev-tools-hub';
    
    logger.info(`Connecting to MongoDB: ${mongoUri}`);
    
    await mongoose.connect(mongoUri);
    logger.info('MongoDB connected');

    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      logger.warn('Admin user already exists');
      await mongoose.disconnect();
      return;
    }

    const admin = new Admin({
      username: 'admin',
      password: 'secret123',
      email: 'admin@example.com',
    });

    await admin.save();
    logger.info('✅ Admin user created successfully!');

    await mongoose.disconnect();
  } catch (error) {
    logger.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();