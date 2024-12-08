import { apiClient } from './client';

export const login = async (id_number, password) => {
  try {
    const response = await apiClient.post('/auth/login', { id_number, password });
    console.log('Login successful');
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const register = async (cnp, first_name, id_number, last_name, nationality, county, city, password, confirmPassword) => {
  try {
    const response = await apiClient.post('/auth/register', { cnp, first_name, id_number, last_name, nationality, county, city, password, confirmPassword });
    console.log('Registration successful');
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};
