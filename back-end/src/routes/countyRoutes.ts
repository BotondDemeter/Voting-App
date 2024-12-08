
import express from 'express';
import { countyController } from '../controllers/countyController';

const router = express.Router();

router.get('/getCounties', countyController.getAllCounties);

router.post('/insertCounty', countyController.insertCounty);

export default router;