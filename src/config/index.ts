import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({
  path: path.join(
    __dirname,
    `../../.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`
  ),
});

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  saltRounds: 10,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  dbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/your-db-name',
  isDev: process.env.NODE_ENV === 'development',
};
