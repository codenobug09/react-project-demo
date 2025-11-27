import axios from 'axios';

const API_URL = 'http://localhost:8083';

export const getUsers = () => axios.get(`${API_URL}/api/users`);
