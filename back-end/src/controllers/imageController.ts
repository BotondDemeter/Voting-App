import { Request, Response } from 'express';
import { runPythonScript } from '../services/imageService';

export const processImage = async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
        res.status(400).json({ error: 'No image uploaded.' });
        return;
    }

    try {
        const result = await runPythonScript(req.file.path);
        res.json(result);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};