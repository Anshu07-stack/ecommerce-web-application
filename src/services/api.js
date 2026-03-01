import axios from 'axios';
const api = axios.create({ baseURL: 'https://dummyjson.com', timeout: 10000 });

api.interceptors.request.use(c => { if (import.meta.env.DEV) console.log(`[API] ${c.method?.toUpperCase()} ${c.url}`); return c; });
api.interceptors.response.use(r => r, e => Promise.reject(!e.response ? new Error('Network error') : e));
export default api;
