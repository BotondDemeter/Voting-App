// routes/userRoutes.ts
import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.post('/login', (req, res, next) => {
    userController.login(req, res);
});

export default router;