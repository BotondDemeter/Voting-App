
import express from 'express';
import { cityController } from '../controllers/cityController';

const router = express.Router();

router.get('/getCities', cityController.getAllCities);

router.post('/insertCity', cityController.insertCity);

export default router;