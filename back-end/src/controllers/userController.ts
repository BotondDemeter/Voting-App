import { Request, Response } from 'express';
import { registerUser, getAllUsers, loginUser } from '../services/userService';

export const handleRegister = async (req: Request, res: Response) => {
    try {
        const result = await registerUser(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: "error.message" });
    }
};

export const handleGetAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve users' });
    }
};

export const handleLogin = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const result = await loginUser(username, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: "error.message" });
    }
};