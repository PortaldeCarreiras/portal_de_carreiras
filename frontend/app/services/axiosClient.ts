import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001', // Substitua pela URL real do seu backend
    timeout: 5000, // Tempo máximo de espera para uma solicitação em milissegundos
    headers: {
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;
