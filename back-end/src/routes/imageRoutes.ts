import express from 'express';
import { imageProcess, uploadMiddleware } from '../controllers/imageController';

const router = express.Router();

// Route for image processing
router.post('/process-image', uploadMiddleware, imageProcess);

export default router;