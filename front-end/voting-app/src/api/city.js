import { apiClient } from './client';
import City from '../types/apiTypes';

export const fetchAllCities = async () => {
    try {
        const response = await apiClient.get('/getCities');
        return response.data;
    } catch (error) {
        console.error('error', error);
        throw new Error('error');
    }
};

export const insertCity = async (city) => {
    try {
        const response = await apiClient.post('/insertCity', city);
        return response.data;
    } catch (error) {
        console.error('Error inserting city:', error);
        throw new Error('Failed to insert city.');
    }
};
