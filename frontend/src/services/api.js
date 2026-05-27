import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || '/api';
console.log('[API] baseURL =', baseURL);

const API = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  console.log('[API] -->', config.method?.toUpperCase(), config.baseURL + config.url);
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(err);
  }
);

export const projectsAPI = {
  getAll: (params) => API.get('/projects', { params }),
  getOne: (id) => API.get(`/projects/${id}`),
  create: (data) => API.post('/projects', data),
  update: (id, data) => API.put(`/projects/${id}`, data),
  delete: (id) => API.delete(`/projects/${id}`),
};

export const skillsAPI = {
  getAll: () => API.get('/skills'),
  create: (data) => API.post('/skills', data),
  update: (id, data) => API.put(`/skills/${id}`, data),
  delete: (id) => API.delete(`/skills/${id}`),
};

export const contactAPI = {
  send: (data) => API.post('/contact', data),
  getAll: () => API.get('/contact'),
  markRead: (id) => API.put(`/contact/${id}/read`),
  delete: (id) => API.delete(`/contact/${id}`),
};

export const authAPI = {
  login: (data) => API.post('/auth/login', data),
  register: (data) => API.post('/auth/register', data),
  getMe: () => API.get('/auth/me'),
};

export const adminAPI = {
  getStats: () => API.get('/admin/stats'),
};

export default API;
