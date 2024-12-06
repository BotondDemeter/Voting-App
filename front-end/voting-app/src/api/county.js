import { apiClient } from './client';
import { County } from '../types/apiTypes';

export const fetchAllCounties = async () => {
    try {
        const response = await apiClient.get('/getCounties');
        return response.data;
    } catch (error) {
        console.error('error', error);
        throw new Error('error');
    }
};

export const insertCounty = async (county) => {
    try {
        const response = await apiClient.post('/insertCounty', county);
        return response.data;
    } catch (error) {
        console.error('Error inserting county:', error);
        throw new Error('Failed to insert county.');
    }
};