import axios from 'axios';

const api = axios.create({
  baseURL: '/local',
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
    if (error.response?.status === 401 && !originalRequest._retry) {
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
  },
);

export default api;
