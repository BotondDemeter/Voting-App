import mongoose, { Schema, Model } from 'mongoose';

// Define the IserModel interface
export interface IUserModel extends mongoose.Document {
    first_name: string;
    last_name: string;
    id_number: string;
    cnp: string;
    nationality: string;
    password: string;
    type: string;
    county: string;
    city: string;
}

const userSchema: Schema<IUserModel> = new mongoose.Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        id_number: { type: String, required: true, unique: true },
        cnp: { type: String, required: true, unique: true },
        nationality: { type: String, required: true },
        password: { type: String, required: true },
        type: { type: String, required: true },
        county: { type: String, required: true },
        city: { type: String, required: true },
    },
    { collection: 'user' }
);

const User: Model<IUserModel> = mongoose.model<IUserModel>('User', userSchema);

export default User;