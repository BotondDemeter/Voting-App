import express from 'express';
import multer from 'multer';
import { processImage } from '../controllers/imageController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/process-image', upload.single('image'), processImage);

export default router;