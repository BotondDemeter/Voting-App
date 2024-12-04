import axios from 'axios';

const API_URL = 'http://172.20.10.3:3000/api';

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
