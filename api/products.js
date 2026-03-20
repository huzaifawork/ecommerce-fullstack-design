import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../server/config/db.js';
import productRoutes from '../server/routes/productRoutes.js';

dotenv.config();

const app = express();
let isConnected = false;

app.use(cors());
app.use(express.json());

const connectToDatabase = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

app.use(async (req, res, next) => {
  await connectToDatabase();
  next();
});

app.use('/', productRoutes);

export default app;
