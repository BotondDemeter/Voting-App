import mongoose, { Schema, Model } from 'mongoose';

export interface IUserModel extends mongoose.Document {
    name: string;
    username: string;
    cnp: string;
    address: string;
    password: string;
}

// Define User Schema
const userSchema: Schema<IUserModel> = new mongoose.Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        cnp: { type: String, required: true, unique: true },
        address: { type: String, required: true },
        password: { type: String, required: true }
    },
    { collection: 'user' }  // Specify the collection name here 
);

// Define and export User model with IUserModel
const User: Model<IUserModel> = mongoose.model<IUserModel>('User', userSchema);

export default User;
