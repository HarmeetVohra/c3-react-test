/**
 * Setting base url to hit the backend API
 * based on the environment
 */
let baseURL;

if (process.env.NODE_ENV === 'development') {
    baseURL = 'https://reqres.in/api/';
}

if (process.env.NODE_ENV === 'production') {
    baseURL = 'https://reqres.in/api/';
}

export const API_VERSION = "v1";
export const BASE_URL = baseURL;