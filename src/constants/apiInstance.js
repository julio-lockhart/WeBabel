import axios from 'axios';
import { TOKEN_PROVIDER_URL } from '../constants/constants';

export const apiInstance = axios.create({
    baseURL: "http://localhost:3001/",
    timeout: 1000,
});

export const tokenProviderInstance = axios.create({
    baseURL: TOKEN_PROVIDER_URL,
    timeout: 1000,
});