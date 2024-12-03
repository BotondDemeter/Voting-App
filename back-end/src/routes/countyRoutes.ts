
import express from 'express';
import { countyController } from '../controllers/countyController';

const router = express.Router();

router.get('/counties', countyController.getAllCounties);

router.post('/counties', countyController.insertCounty);

export default router;