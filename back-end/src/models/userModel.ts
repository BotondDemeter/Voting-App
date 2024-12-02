import mongoose, { Schema, Model } from 'mongoose';

// Define the IUserModel interface
export interface IUserModel extends mongoose.Document {
    first_name: string;
    last_name: string;
    id_number: string;
    cnp: string;
    nationality: string;
    password: string;
}

// Define the User Schema
const userSchema: Schema<IUserModel> = new mongoose.Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        id_number: { type: String, required: true, unique: true },
        cnp: { type: String, required: true, unique: true },
        nationality: { type: String, required: true },
        password: { type: String, required: true },
    },
    { collection: 'user' } // Specify the collection name
);

// Define and export the User model
const User: Model<IUserModel> = mongoose.model<IUserModel>('User', userSchema);

export default User;