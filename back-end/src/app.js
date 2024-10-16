"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database"); // Import the MongoDB connection function
// Load environment variables from the .env file
dotenv_1.default.config();
// Create an Express application
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Connect to MongoDB
// Connect to MongoDB
(0, database_1.connectToMongoDB)()
    .then(() => {
    console.log('MongoDB connection established');
    // Start the server after a successful connection
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit the process if the connection fails
});
