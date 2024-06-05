import { createContext, useContext } from 'react';
import useSWR from 'swr';
import { login, updateUser } from '../api/auth';

export interface User {
  gender: string;
  ageRange: string;
}

export const useUserProvider = () => {
  const { data: user, isLoading, mutate } = useSWR<User>('/user');
  const handleLogin = async (payload: Parameters<typeof login>[0]) => {
    try {
      const response = await login(payload);

      if (response.accessToken && response.refreshToken) {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        mutate();
      } else {
        throw 'Invalid response from server';
      }
    } catch (err: any) {
      throw 'Login failed: ' + (err.response?.data?.message || err.message);
    }
  };

  const handleUpdateUser = async (
    payload: Parameters<typeof updateUser>[0],
  ) => {
    const response = await updateUser(payload);
    mutate(response);
  };

  return {
    user,
    login: handleLogin,
    loading: isLoading,
    updateUser: handleUpdateUser,
  };
};

export const userContext = createContext<
  ReturnType<typeof useUserProvider> | undefined
>(undefined);

const useUser = () => {
  const value = useContext(userContext);
  if (value === undefined)
    throw new Error('useUser must be used within a UserProvider');
  return value;
};

export default useUser;
