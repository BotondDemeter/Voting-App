import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import path from 'path';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files like index.html

// Routes
app.get('/', (req: Request, res: Response) => {
  // Serve the index.html file located in the 'public' folder
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api', userRoutes); // API routes for user management

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || '';

mongoose.connect(mongoUri, { dbName: 'SoftwareRendszerekDatabase' })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Global Error Handler
app.use((err: { message: string; status?: string; statusCode?: number }, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// Start Server
const port = parseInt(process.env.PORT || '3000', 10);
const ipAddress = process.env.IP || 'localhost';

app.listen(port, ipAddress, () => {
  console.log(`Server is running on http://${ipAddress}:${port}`);
});
