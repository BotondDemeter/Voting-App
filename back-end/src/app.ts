import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import votingRoutes from './routes/VotingRoutes'; // Ensure case sensitivity is correct
import imageRoutes from './routes/imageRoutes';
import countyRoutes from './routes/countyRoutes';
import cityRoutes from './routes/cityRoutes';

import path from 'path';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/auth', userRoutes);
app.use('/api/votings', votingRoutes); 
app.use('/api', imageRoutes);
app.use('/api', countyRoutes);
app.use('/api', cityRoutes);

const mongoUri = process.env.MONGODB_URI || '';
mongoose.connect(mongoUri, { dbName: 'SoftwareRendszerekDatabase' })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err: { message: string; status?: string; statusCode?: number }, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port = parseInt(process.env.PORT || '3000', 10);
const ipAddress = process.env.IP || 'localhost';

app.listen(port, ipAddress, () => {
  console.log(`Server is running on http://${ipAddress}:${port}`);
});