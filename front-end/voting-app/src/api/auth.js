import { apiClient } from './client';

export const login = async (username, password) => {
  try {
    const response = await apiClient.post('/auth/login', { username, password });
    console.log('Login successful');
    return response.data; 
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
