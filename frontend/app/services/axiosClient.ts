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
    const id = localStorage.getItem('id'); // Supondo que o ID esteja no localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    if (id) {
        config.headers['X-User-ID'] = id; // Adiciona o ID ao cabeçalho
    }
    return config;
});

export default instance;
