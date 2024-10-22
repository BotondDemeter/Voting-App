import express from 'express';
import { handleRegister, handleGetAllUsers } from '../controllers/userController';

const router = express.Router();

router.post('/register', handleRegister);
router.get('/getAllUsers', handleGetAllUsers);

export default router;
