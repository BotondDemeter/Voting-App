// controllers/userController.ts
import { Request, Response, NextFunction } from 'express';
import { registerUser, getAllUsers } from '../services/userService';
import User from '../models/userModel';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
    try {
        const { name, username, cnp, address, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            username,
            cnp,
            address,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User registered successfully' });

    } catch(err){
        res.status(500).json({message: 'Internal Server Error'});
    }
};

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
                address: user.address,
                type: user.type
            }
        }); 
    } catch (err) {
       res.status(500).json({ message: 'Internal Server Error' });
    }
};