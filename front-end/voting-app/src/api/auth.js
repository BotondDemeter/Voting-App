import { apiClient } from './client';

export const login = async (username, password) => {
  try {
    const response = await apiClient.post('/auth/login', { username, password });

    console.log("API Response:", response);  // Add this to debug
    return response.data;  // Ensure response data is returned
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
