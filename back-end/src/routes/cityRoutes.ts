
import express from 'express';
import { cityController } from '../controllers/cityController';

const router = express.Router();

router.get('/cities', cityController.getAllCities);

router.post('/cities', cityController.insertCity);

export default router;