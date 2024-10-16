import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const app = express();

// 1. Middleware


// 2. Routes


// 3. Mongodb connection

const mongoUri = process.env.MONGODB_URI || '';

mongoose.connect(mongoUri, { dbName: 'SoftwareRendszerekDatabase' })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


// 4. Global Error handler
app.use ((err: {
  message: any;
  status: string; statusCode: number; 
}, req: any, res: any, next: any) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
})

// 5. Start server

const port = parseInt(process.env.PORT || '3000', 10);
const ipAddress = process.env.IP || 'localhost';

app.listen(port, ipAddress, () => {
  console.log(`Server is running on http://${ipAddress}:${port}`);
});


