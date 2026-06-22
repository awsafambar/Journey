import axios from 'axios';

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 10000
})

// interceptors are security check
api.interceptors.request.use((config) => {
    console.log('📤 REQUEST:', (config.method ?? 'GET').toUpperCase(), config.url);
    console.log('Headers:', config.headers);
    console.log('Data:', config.data);
    return config;
},
    (error) => {
        console.log('❌ REQUEST ERROR:', error);
        return Promise.reject(error);
    }
)

api.interceptors.response.use(response => {
    console.log('📥 RESPONSE:', response.status, response.config.url);
    console.log('Data:', response.data);
    return response;
},
    (error) => {
        console.log('❌ REQUEST ERROR:', error);
        return Promise.reject(error);
    }
)

export default api;