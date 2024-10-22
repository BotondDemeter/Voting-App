import { User } from '../types/apiTypes';
import { apiClient } from './client';

export const fetchAllUsers = async () => {
    try {
        const response = await apiClient.get('/getAllUsers'); // Make sure to include the actual URL or endpoint
        return response.data; // Assuming the response contains a list of users
    } catch (error) {
        console.error('error', error);
        throw new Error('error');
    }
};
