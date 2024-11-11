import express from 'express';
import { handleRegister, handleGetAllUsers, handleLogin } from '../controllers/userController';

const router = express.Router();

router.post('/register', handleRegister);
router.get('/getAllUsers', handleGetAllUsers);
router.post('/login', handleLogin);

export default router;
