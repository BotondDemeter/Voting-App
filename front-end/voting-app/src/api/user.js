import { User } from '../types/apiTypes';
import { apiClient } from './client';

export const fetchAllUsers = async () => {
    try {
        const response = await apiClient.get('/getAllUsers');
        return response.data;
    } catch (error) {
        console.error('error', error);
        throw new Error('error');
    }
};
