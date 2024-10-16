"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongoDB = connectToMongoDB;
exports.getConnection = getConnection;
// src/config/database.ts
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Define the MongoDB URI
const mongoUri = process.env.MONGODB_URI || '';
// Function to connect to MongoDB using Mongoose
function connectToMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to MongoDB with the specified database name
            yield mongoose_1.default.connect(mongoUri, { dbName: 'SoftwareRendszerekDatabase' });
            console.log('Connected to MongoDB');
        }
        catch (err) {
            console.error('Error connecting to MongoDB:', err);
            process.exit(1); // Exit the process if the connection fails
        }
    });
}
// Function to get the Mongoose connection instance
function getConnection() {
    return mongoose_1.default.connection;
}
