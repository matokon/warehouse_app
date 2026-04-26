import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
    baseURL: 'http://192.168.0.47:3000',
    timeout: 10000,
});

api.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync('jwt_token');
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
});

export default api;