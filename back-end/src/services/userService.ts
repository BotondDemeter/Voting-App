import User from '../models/userModel';
import bcrypt from 'bcrypt';

export const registerUser = async (userData: { name: string, username: string, cnp: string, address: string, password: string }) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new User({
        ...userData,
        password: hashedPassword
    });

    try {
        await newUser.save();
        return { message: 'User registered successfully' };
    } catch (error) {
        throw new Error("error.message");
    }
};

export const getAllUsers = async () => {
    return User.find({}, '-password'); // Exclude the password field
};
