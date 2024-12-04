// controllers/userController.ts
import { Request, Response, NextFunction } from 'express';

import User from '../models/userModel';
import { City } from '../models/cityModel';
import { County } from '../models/countyModel';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
    try {
        const { cnp, first_name, id_number, last_name, nationality, county, city, password, confirmPassword} = req.body;

        console.log('Incoming data:', req.body);

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const existingUser = await User.findOne({ cnp });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }



        // let newCounty  = await County.findOne({ name: county });
        // if (!county) {
        //     newCounty = new County({ name: county });
        //     await newCounty.save();
        // }

        // let newCity = await City.findOne({ name: city });
        // if (!city) {
        //     newCity = new City({ name: city});
        //     await newCity.save();
        // }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            cnp,
            first_name,
            id_number,
            last_name,
            nationality,
            password: hashedPassword,
            type: 'ORGANIZER',
            county,
            city
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error in register:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { id_number, password } = req.body;

        // Find the user by id_number
        const user = await User.findOne({ id_number });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Respond with user details on successful login
        res.status(200).json({ 
            message: 'Login successful',
            user: {
                id_number: user.id_number,
                first_name: user.first_name,
                last_name: user.last_name,
                cnp: user.cnp,
                nationality: user.nationality,
            }
        }); 
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};