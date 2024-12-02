import { Request, Response } from 'express';
import multer from 'multer';
import { runPythonScript } from '../services/imageService';

const upload = multer();


export const imageProcess = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            console.error('No file uploaded.');
            res.status(400).json({ error: 'No image provided' });
            return;
        }

        console.log('Uploaded file details:', req.file);

        const imageBuffer = req.file.buffer;

        if (!imageBuffer || imageBuffer.length === 0) {
            console.error('Uploaded file buffer is empty.');
            res.status(400).json({ error: 'Uploaded file is empty' });
            return;
        }

        const result = await runPythonScript(imageBuffer);
        res.json(result);
    } catch (error) {
        console.error('Error in image processing:', error);
        res.status(500).json({ error: error || 'Internal Server Error' });
    }
};

export const uploadMiddleware = upload.single('image');