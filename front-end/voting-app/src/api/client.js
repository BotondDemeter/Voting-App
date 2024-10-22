import axios from 'axios';

const API_URL = 'http://192.168.1.206:3000/api';

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});