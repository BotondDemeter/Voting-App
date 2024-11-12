// controllers/userController.ts
import { Request, Response, NextFunction } from 'express';
import { registerUser, getAllUsers } from '../services/userService';
import User from '../models/userModel';
import bcrypt from 'bcrypt';

// export const handleRegister = async (req: Request, res: Response): Promise<Response> => {
//     try {
//         const result = await registerUser(req.body);
//         return res.status(201).json(result);
//     } catch (error: any) {
//         return res.status(400).json({ message: error.message });
//     }
// };

// export const handleGetAllUsers = async (req: Request, res: Response): Promise<Response> => {
//     try {
//         const users = await getAllUsers();
//         return res.status(200).json(users);
//     } catch (error: any) {
//         return res.status(500).json({ message: 'Failed to retrieve users' });
//     }
// };

// controllers/userController.ts
export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        res.status(200).json({ 
            message: 'Login successful',
            user :{
                name: user.name,
                username: user.username,
                cnp: user.cnp,
                address: user.address
            }
        });

        
    } catch (err) {
       // You can also remove the next parameter here
       // and handle the error directly
       res.status(500).json({ message: 'Internal Server Error' });
    }
};