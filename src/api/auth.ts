import api from '.';

export const register = (payload: {
  name: string;
  registerId: string;
  password: string;
}) =>
  api
    .post<{ message: string }>('/auth/register', payload)
    .then((res) => res.data);

export const login = (payload: { loginId: string; password: string }) =>
  api
    .post<{ accessToken: string; refreshToken: string }>('/auth/login', payload)
    .then((res) => res.data);
