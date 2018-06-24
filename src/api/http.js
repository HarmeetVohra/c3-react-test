import axios from 'axios';

import { BASE_URL } from 'config';

// Creating axios instance with custom configuration
const http = axios.create({
    baseURL: BASE_URL
});

// Intercepting the API response and passing the response.data
http.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error)
);

export default http;