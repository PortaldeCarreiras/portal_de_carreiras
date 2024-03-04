import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001', // Substitua pela URL real do seu backend
    timeout: 5000, // Tempo máximo de espera para uma solicitação em milissegundos
});

export default api;
