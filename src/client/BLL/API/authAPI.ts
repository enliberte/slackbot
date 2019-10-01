import axios from 'axios';

export const fetchGetAuth = () => axios.get('/auth');