import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

//request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        //handle common errors globally
        if (error.response) {
            if(error.response.status === 401) {
                window.location.href = '/login';
            }
            else if (error.response.status === 500) {
                console.error('Internal Server Error:', error.response.data);
                alert('An unexpected error occurred. Please try again later.');
            }
        } else if (error.code === 'ECONNABORTED') {
            console.error('Request timed out:', error.message);
            alert('The request took too long to complete. Please try again later.');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;


