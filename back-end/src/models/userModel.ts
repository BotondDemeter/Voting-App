import mongoose from 'mongoose';

// Define User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    cnp: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

export default User;
