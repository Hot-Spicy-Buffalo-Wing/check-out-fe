import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.DEV ? '/local' : 'https://api.check-out.paperst.ar',
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      if (originalRequest._retry || originalRequest.url === '/auth/refresh') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return Promise.reject(error);
      }
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        return Promise.reject(error);
      }
      try {
        const response = await api.post('/auth/refresh', {
          refreshToken,
        });
        if (response.data.accessToken) {
          localStorage.setItem('accessToken', response.data.accessToken);
          return api(originalRequest);
        }
      } catch (err) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
